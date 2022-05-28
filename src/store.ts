import { writable } from "svelte/store";

export const darkMode = writable<boolean>(localStorage.darkMode == "true");

darkMode.subscribe((value) => localStorage.darkMode = String(value));

// TODO persist complete components, e.g. Settings
