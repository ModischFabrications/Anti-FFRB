<script>
	export let app_name;
	export let app_version;
</script>

<main>
	<h1>Welcome to {app_name}</h1>
	<h2>This will eventually be a utility to combat <a href="https://www.webmd.com/mental-health/ss/slideshow-understanding-body-focused-repetitive-behavior">Face-focused repetitive behaviors (FFRBs)</a> </h2>
	<h3>WORK IN PROGRESS!</h3>
	<p>Look at the source code <a href="https://github.com/ModischFabrications/Anti-FFRB">[here]</a> </p>
	<p>Version {app_version} is currently deployed.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
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