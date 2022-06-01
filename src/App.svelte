<script lang="ts">
	export let app_name: string;
	export let app_version: string;
	import LayoutGrid, { Cell } from "@smui/layout-grid";

	import Settings from "./components/Settings.svelte";
	import Preview from "./components/Preview.svelte";
	import NavBar from "./components/NavBar.svelte";

	let alertSettings: { popup: boolean; sound: boolean; flashing: boolean };

	function sendAlert() {
		if (alertSettings.popup) alert("Stop that!");
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

<main>
	<NavBar {app_name} {app_version} />

	<div class="content">
		<h2>WORK IN PROGRESS!</h2>
		<h2>
			This will eventually be a utility to combat <a
				href="https://www.webmd.com/mental-health/ss/slideshow-understanding-body-focused-repetitive-behavior"
				>Face-focused repetitive behaviors (FFRBs)</a
			>
		</h2>

		<LayoutGrid>
			<Cell span={8}>
				<Preview on:detection={sendAlert} />
			</Cell>
			<Cell span={4}>
				<Settings bind:alerts={alertSettings} />
			</Cell>
		</LayoutGrid>
	</div>
</main>

<style>
	.content {
		padding: 2em;
		margin: auto;
		max-width: 140ch;
	}

	:global(.error-text) {
        color: hsl(0, 40%, 50%);
    }

	:global(.warn-text) {
        color: hsl(46, 100%, 40%)
    }
</style>
