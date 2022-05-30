<script lang="ts">
	export let app_name: string;
	export let app_version: string;
	import LayoutGrid, { Cell } from "@smui/layout-grid";

	import Settings from "./components/Settings.svelte";
	import Preview from "./components/Preview.svelte";
	import NavBar from "./components/NavBar.svelte";
</script>

<svelte:head>
	<title>{app_name}</title>
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
				<Preview />
			</Cell>
			<Cell span={4}>
				<Settings />
			</Cell>
		</LayoutGrid>
	</div>
</main>

<style>
	.content {
		padding: 2em;
	}
</style>
