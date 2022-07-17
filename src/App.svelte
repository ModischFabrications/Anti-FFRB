<script lang="ts">
	export let app_name: string;
	export let app_version: string;
	import LayoutGrid, { Cell } from "@smui/layout-grid";
	import type { Writable } from "svelte/store";

	import Settings, { Alerts } from "./components/Settings.svelte";
	import Preview from "./components/Preview.svelte";
	import NavBar from "./components/NavBar.svelte";

	let alertSettings: Writable<Alerts>;

	// only mp3/wav are universally supported
	const alertSound = new Audio("audio//Buzzer.ogg.mp3");

	let flashTimer;

	function sendAlert() {
		if ($alertSettings.popup) {
			alert("Stop that!");
		}

		if ($alertSettings.sound && alertSound.paused) {
			// this needs a prior user interaction!
			alertSound.play();
		}

		if ($alertSettings.flashing) {
			window.document.body.classList.add("flash");
			clearTimeout(flashTimer);
			flashTimer = setTimeout(() => {
				window.document.body.classList.remove("flash");
			}, 200);
		}
	}
</script>

<svelte:head>
	<title>{app_name}</title>
	<meta name="author" content="Modisch Fabrications" />
	<meta
		name="description"
		content="Online tool to combat face focused repetitive behaviours like nail biting, hair pulling, nose picking and more"
	/>
	<meta
		name="keywords"
		content="ffrb, face, focused, repetitive, behaviours, behavior, modisch, fabrications, nail, biting, hair, pulling, nose, picking, utility, online, tool"
	/>
	<meta property="og:title" content="{app_name}: Stop nail biting now!" />
</svelte:head>

<NavBar {app_name} {app_version} />
<main>
	<h3>
		This is a utility to combat <a
			href="https://www.webmd.com/mental-health/ss/slideshow-understanding-body-focused-repetitive-behavior"
			>Face-focused repetitive behaviors (FFRBs)</a
		>.
	</h3>
	<p>Select your preferred alert and try touching your face!</p>

	<LayoutGrid>
		<Cell span={8}>
			<Preview on:detection={sendAlert} />
		</Cell>
		<Cell span={4}>
			<Settings bind:alertsStore={alertSettings} />
		</Cell>
	</LayoutGrid>

	<p class="hint-text">
		Hint: Try facing the camera and turning on your lights if detection is
		unreliable.
	</p>
</main>
<footer>
	<p>
		© Robin Modisch | <a href="https://legal.modisch.me/en/privacy"
			>Privacy Policy</a
		>
	</p>
</footer>

<style>
	main {
		padding: 1rem;
		margin: auto;
		/* max-width: 100ch; */
		text-align: center;

		flex: 1;
	}

	footer {
		opacity: 0.6;
		text-align: center;
	}

	/* global needed to suppress stripping */
	:global(.flash) {
		animation: flash-anim 0.2s infinite alternate;
	}

	@keyframes flash-anim {
		from {
			background-color: hsla(290, 100%, 40%, 0.5);
		}
		to {
			background-color: hsla(59, 100%, 40%, 0.5);
		}
	}

	:global(.error-text) {
		color: hsl(0, 40%, 50%);
	}

	:global(.warn-text) {
		color: hsl(46, 100%, 40%);
	}

	:global(.inlay-text) {
		color: hsl(0, 0%, 60%);
	}

	:global(.hint-text) {
		opacity: 0.5;
	}

	:global(.p-container) {
		margin: 1rem;
		min-height: 2rem;
	}

	:global(.spinner) {
		animation: rotation 2s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
