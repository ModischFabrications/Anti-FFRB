import { writable } from 'svelte/store';

export interface Alerts {
    sound: boolean;
    notification: boolean;
    flashing: boolean;
}

const defaultAlerts: Alerts = {
    sound: false,
    notification: true,
    flashing: true,
};

const initialAlerts = localStorage.alerts
    ? JSON.parse(localStorage.getItem("alerts"))
    : defaultAlerts;

export const alertsStore = writable<Alerts>(initialAlerts);

alertsStore.subscribe((val) => {
    if (typeof window !== 'undefined') {
        localStorage.alerts = JSON.stringify(val);
    }
});
