import App from "./App.svelte";

const app = new App({
	target: document.body,
	props: {
		app_name: 'Anti-FFRB',
		app_version: 'v0.8.1',
	}
});

export default app;