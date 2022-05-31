<script lang="ts">
    import * as handTrack from "handtrackjs";

    const modelParams = {
        flipHorizontal: true, // flip e.g for video
        maxNumBoxes: 10, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression
        scoreThreshold: 0.3, // confidence threshold for predictions.
    };

    let canvas: HTMLCanvasElement;
    let video: HTMLVideoElement;
    let isVideo: boolean;

    let model = null;

    let modelPromise = handTrack.load(modelParams).then((lmodel) => {
        model = lmodel;
        console.log("model loaded");

        // TODO connect to toggle/dropdown
        setTimeout(() => {
            startVideo();
        }, 100);
    });

    function runDetection() {
        model.detect(video).then((predictions) => {
            if (!isVideo) return;

            model.renderPredictions(
                predictions,
                canvas,
                canvas.getContext("2d"),
                video
            );

            // queue for next frame
            requestAnimationFrame(runDetection);
        });
    }

    function startVideo() {
        console.log("Starting video stream...");
        // video.width and .height are possible, but not needed atm

        // TODO add promise to second #await
        handTrack.startVideo(video).then(function (res) {
            console.log("--> " + res.msg);
            if (res.status) {
                console.log("Video started. Now tracking");
                isVideo = true;
                runDetection();
            } else {
                console.error("Please enable video");
            }
            video.style.height = "";
        });
    }

    function stopVideo() {
        handTrack.stopVideo(video);
        isVideo = false;
    }
</script>

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

<style>
    /* handtracking uses a ratio of 4/3, so we normalize to that */
    .preview-container {
        background: #f1f1f1;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 4/3;

        border-radius: 0.5em;
        outline: 0.2em solid #e0e0e0;
    }

    .video-container {
        width: 100%;

    }
</style>
