<script lang="ts">
    import { fade } from "svelte/transition";
    import * as handTrack from "handtrackjs";
    import { createEventDispatcher } from "svelte";
    import { missing_component } from "svelte/internal";
    import { hasAnyCollision } from "../2d";

    // this should have been part of handTrack.js
    interface Prediction {
        bbox: number[]; // xPos, yPos, Width, Height
        class: number;
        label: string;
        score: string;
    }

    const dispatch = createEventDispatcher();

    const f_threshold = 0.1;

    // TODO tune to perfection; maybe extract into settings
    const modelParams = {
        flipHorizontal: true, // flip e.g for video
        maxNumBoxes: 10, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression ???
        scoreThreshold: 0.5, // confidence threshold for predictions.
        //modelType: "ssd640fpnlite", // better detection of face/hand overlaps
        //modelSize: "small",
    };

    let canvas: HTMLCanvasElement;
    let video: HTMLVideoElement;
    let isVideo: boolean;

    let model = null;
    let modelPromise = null;

    let no_face = false;
    let no_cam = false;

    // TODO maybe just offer a button?
    setTimeout(loadModel, 100);

    function loadModel() {
        console.log("loading model, this might take a while...");
        modelPromise = handTrack.load(modelParams).then((lmodel) => {
            model = lmodel;
            console.log("model loaded");

            // TODO connect to toggle/dropdown?
            setTimeout(() => {
                startVideo();
            }, 100);
        });
    }

    function handlePredictions(ps: Prediction[]) {
        let faces = ps
            .filter((p) => p.label == "face")
            .sort((a, b) => Number(a.score) - Number(b.score));
        no_face = faces.length == 0;
        if (no_face) return;

        let hands = ps
            .filter((x) => !faces.includes(x))
            .sort((a, b) => Number(a.score) - Number(b.score));
        if (hands.length < 1) return;

        // diagonal is more expensive and can be packed into multiplier
        let threshold = faces[0].bbox[2] * f_threshold;
        let collison = hasAnyCollision(
            faces.map((f) => f.bbox),
            hands.map((h) => h.bbox),
            threshold
        );
        if (!collison) return;

        // TODO wait for x seconds continuous

        dispatch("detection");
    }

    function runDetection() {
        model.detect(video).then((predictions) => {
            if (!isVideo) return;

            model.renderPredictions(
                predictions,
                canvas,
                canvas.getContext("2d"),
                video
            );

            handlePredictions(predictions);

            // queue for next frame
            requestAnimationFrame(runDetection);
        });
    }

    function startVideo() {
        console.log("Starting video stream...");

        // TODO add promise to second #await to show video loading
        handTrack.startVideo(video).then(function (res) {
            console.log("--> " + res.msg);
            if (res.status) {
                console.log("Video started. Now tracking");
                isVideo = true;
                runDetection();
            } else {
                no_cam = true;
            }
            video.style.height = "";
        });
    }

    function stopVideo() {
        handTrack.stopVideo(video);
        isVideo = false;
    }
</script>

<div>
    <div class="preview-container" alt="video stream preview">
        {#await modelPromise}
            <p>The AI is still waking up, this might take a while..</p>
        {:then _}
            <!-- svelte-ignore a11y-media-has-caption -->
            <video style="display: none;" bind:this={video} />
            <canvas class="video-container" bind:this={canvas} />
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
    <div class="info-container">
        {#if no_face}
            <p class="warn-text" transition:fade>No face found.</p>
        {/if}
        {#if no_cam}
            <p class="error-text" transition:fade>
                No stream. Please allow video access.
            </p>
        {/if}
    </div>
</div>

<style>
    /* handtrack.js uses a ratio of 4/3, so we normalize to that */
    .preview-container {
        background: hsla(0, 0%, 70%, 0.3);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 4/3;

        border-radius: 0.5rem;
        outline: 0.3rem solid hsl(0, 0%, 70%, 0.5);
    }

    .video-container {
        width: 100%;
        border-radius: inherit;
    }

    .info-container {
        margin: 1rem;
        min-height: 2rem;
    }
</style>
