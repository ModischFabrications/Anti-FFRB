<script lang="ts">
    import { fade } from "svelte/transition";
    import * as handTrack from "handtrackjs";
    import { createEventDispatcher } from "svelte";
    import { hasAnyCollision } from "./2d";
    import Fa from "svelte-fa";
    import {
        faCirclePlay,
        faCirclePause,
        faSpinner,
    } from "@fortawesome/free-solid-svg-icons";

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
    let context: CanvasRenderingContext2D;

    let isVideoRunning = false;
    let hasFace = true;
    let camBlocked = false;

    let model = null;
    loadModel();

    function loadModel() {
        console.log("loading model, this might take a while...");
        handTrack.load(modelParams).then((lmodel) => {
            model = lmodel;
            console.log("model loaded");
        });
    }

    function handlePredictions(ps: Prediction[]) {
        let faces = ps
            .filter((p) => p.label == "face")
            .sort((a, b) => Number(a.score) - Number(b.score));
        hasFace = faces.length > 0;
        if (!hasFace) return;

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
            if (!isVideoRunning) return;

            model.renderPredictions(predictions, canvas, context, video);

            handlePredictions(predictions);

            // queue for next frame
            requestAnimationFrame(runDetection);
        });
    }

    function toggleVideo() {
        if (!model) return;
        if (isVideoRunning) stopVideo();
        else startVideo();
    }

    function startVideo() {
        console.log("Starting video stream...");
        context = canvas.getContext("2d");

        // TODO add promise to second #await to show video loading
        handTrack.startVideo(video).then(function (res) {
            console.log("--> " + res.msg);
            if (res.status) {
                console.log("Video started. Now tracking");
                isVideoRunning = true;
                camBlocked = false;
                runDetection();
            } else {
                camBlocked = true;
            }
            video.style.height = "";
        });
    }

    function stopVideo() {
        console.log("Stopping video stream...");
        handTrack.stopVideo(video);
        context.clearRect(0, 0, canvas.width, canvas.height);
        isVideoRunning = false;
    }
</script>

<div>
    <div class="preview-container" on:click={toggleVideo}>
        <div class="overlay-container">
            {#if !model}
                <Fa icon={faSpinner} size="4x" class="spinner inlay-text" />
                <p in:fade class="inlay-text">
                    The AI is still waking up, this might take a while..
                </p>
            {:else if !isVideoRunning && !camBlocked}
                <Fa icon={faCirclePlay} size="4x" class="inlay-text" />
                <p in:fade class="inlay-text">Click to start</p>
            {:else if isVideoRunning && !camBlocked}
                <Fa
                    icon={faCirclePause}
                    size="4x"
                    class="hoverhint inlay-text"
                />
                <p in:fade class="hoverhint inlay-text">Click to pause</p>
            {:else if camBlocked}
                <p class="error-text" in:fade>
                    No stream. Please allow video access.
                </p>
            {:else}
                <p in:fade>This should be a video...</p>
            {/if}
        </div>

        <!-- svelte-ignore a11y-media-has-caption -->
        <video style="display: none;" bind:this={video} />
        <canvas class="prediction-container" bind:this={canvas} />
    </div>
    <div class="p-container">
        {#if !hasFace}
            <p class="warn-text" transition:fade>No face found.</p>
        {/if}
    </div>
</div>

<style>
    .overlay-container {
        position: absolute;
    }

    /* handtrack.js uses a ratio of 4/3, so we normalize to that */
    .preview-container {
        background: hsla(0, 0%, 70%, 0.3);
        aspect-ratio: 4/3;
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 0.5rem;
        outline: 0.3rem solid hsl(0, 0%, 70%, 0.5);
    }

    .prediction-container {
        width: 100%;
        border-radius: inherit;
    }

    .preview-container:hover :global(.hoverhint) {
        opacity: 0.7;
        transition: 0.5s ease;
    }

    :global(.hoverhint) {
        opacity: 0;
        transition: 0.5s ease;
    }
</style>
