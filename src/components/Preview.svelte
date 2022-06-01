<script lang="ts">
    import { fade } from "svelte/transition";
    import * as handTrack from "handtrackjs";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    // TODO tune to perfection; maybe extract into settings
    const modelParams = {
        flipHorizontal: true, // flip e.g for video
        maxNumBoxes: 10, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression ???
        scoreThreshold: 0.4, // confidence threshold for predictions.
        modelType: "ssd640fpnlite", // better detection of face/hand overlaps
        modelSize: "small",
    };

    let canvas: HTMLCanvasElement;
    let video: HTMLVideoElement;
    let isVideo: boolean;

    let model = null;

    let no_face = false;
    let no_cam = false;

    let modelPromise = handTrack.load(modelParams).then((lmodel) => {
        model = lmodel;
        console.log("model loaded");

        // TODO connect to toggle/dropdown
        setTimeout(() => {
            startVideo();
        }, 100);
    });

    // TODO emit as event for external analysis
    function handlePredictions(
        ps: {
            bbox: number[];
            class: number;
            label: string;
            score: string;
        }[]
    ) {
        let faces = ps.filter((p) => p.label == "face");
        no_face = faces.length == 0;

        let hands = ps.filter((x) => !faces.includes(x));
        if (hands.length < 1) return;

        // TODO boundry box check, wait for x seconds continuous

        dispatch("detection", [faces, hands]);
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

        // TODO add promise to second #await
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
        {:then res}
            <!-- svelte-ignore a11y-media-has-caption -->
            <video style="display: none;" bind:this={video} />
            <canvas class="video-container" bind:this={canvas} />
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
    {#if no_face}
        <p class="error-text" transition:fade>No face found.</p>
    {/if}
    {#if no_cam}
        <p class="error-text" transition:fade>
            No stream. Please allow video access.
        </p>
    {/if}
</div>

<style>
    /* handtracking uses a ratio of 4/3, so we normalize to that */
    .preview-container {
        background: hsla(0, 0%, 70%, 0.3);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 4/3;

        border-radius: 0.5em;
        outline: 0.3em solid hsl(0, 0%, 70%, 0.5);
    }

    .video-container {
        width: 100%;
        border-radius: inherit;
    }

    .error-text {
        color: hsl(0, 40%, 50%);
    }
</style>
