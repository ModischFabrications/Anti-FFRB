<script context="module" lang="ts">
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
</script>

<script lang="ts">
    import Switch from "@smui/switch";
    import FormField from "@smui/form-field";
    import { fade } from "svelte/transition";
    import { writable } from "svelte/store";

    // getItem can handle undefined objects
    export const alertsStore = writable<Alerts>(
        localStorage.alerts
            ? JSON.parse(localStorage.getItem("alerts"))
            : defaultAlerts
    );
    alertsStore.subscribe((val) => (localStorage.alerts = JSON.stringify(val)));

    $: if (
        $alertsStore.notification &&
        typeof Notification !== "undefined" &&
        Notification.permission !== "granted"
    ) {
        Notification.requestPermission();
    }
</script>

<div class="settings-container">
    <p>Alert Methods</p>
    <div>
        <FormField>
            <Switch bind:checked={$alertsStore.sound} /><span slot="label"
                >Audio Signal (Buzzer)</span
            >
        </FormField>
    </div>
    <div>
        <FormField>
            <Switch bind:checked={$alertsStore.notification} /><span
                slot="label">System Notification (Global)</span
            >
        </FormField>
    </div>
    <div>
        <FormField>
            <Switch bind:checked={$alertsStore.flashing} /><span slot="label"
                >Visual Signal (Screen Flash)</span
            >
        </FormField>
    </div>

    <div class="p-container">
        {#if !Object.values($alertsStore).some((a) => a)}
            <p class="warn-text" transition:fade>
                Please select at least one alert method to stay notified.
            </p>
        {/if}
    </div>
</div>

<style>
    .settings-container {
        text-align: left;
    }
</style>
