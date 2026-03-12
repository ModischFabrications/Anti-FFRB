import App from "./App.svelte";
import pkg from "../package.json";

const app = new App({
	target: document.body,
	props: {
		app_name: 'Anti-FFRB',
		app_version: `v${pkg.version}`,
	}
});

export default app;