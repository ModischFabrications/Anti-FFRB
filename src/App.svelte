<script lang="ts">
	export let app_name: string;
	export let app_version: string;
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	import {darkMode} from './store';
	import Settings from "./components/Settings.svelte";


</script>

<main>
	<h1>Welcome to {app_name}</h1>
	<h2>This will eventually be a utility to combat <a href="https://www.webmd.com/mental-health/ss/slideshow-understanding-body-focused-repetitive-behavior">Face-focused repetitive behaviors (FFRBs)</a> </h2>
	<h3>WORK IN PROGRESS!</h3>
	<p>Look at the source code <a href="https://github.com/ModischFabrications/Anti-FFRB">[here]</a> </p>
	<p>Version {app_version} is currently deployed.</p>
	<p>Darkmode: [{$darkMode}]</p>

	<button on:click={() => darkMode.set(false)}>
		light
	</button>
	<button on:click={() => darkMode.set(true)}>
		dark
	</button>

	<LayoutGrid>
		<Cell span={8}>
			<p>This will be a video soon...</p>
	<!-- TODO {#await tracking}
		
	{:then } 
		
	{/await}-->
		  </Cell>
		  <Cell span={4}>
			<Settings />
		  </Cell>
	</LayoutGrid>

	
</main>

<style>
	main {
		padding: 2em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>