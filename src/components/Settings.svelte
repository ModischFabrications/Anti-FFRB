<script context="module" lang="ts">
    export interface Alerts {
        sound: boolean;
        popup: boolean;
        flashing: boolean;
    }

    const defaultAlerts: Alerts = {
        sound: false,
        popup: false,
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
</script>

<div>
    <p>How do you want to be alerted?</p>
    <div>
        <FormField>
            <Switch bind:checked={$alertsStore.sound} /><span slot="label"
                >Sound</span
            >
        </FormField>
    </div>
    <div>
        <FormField>
            <Switch bind:checked={$alertsStore.popup} /><span slot="label"
                >Popup</span
            >
        </FormField>
    </div>
    <div>
        <FormField>
            <Switch bind:checked={$alertsStore.flashing} /><span slot="label"
                >Flashing</span
            >
        </FormField>
    </div>

    {#if !Object.values($alertsStore).some((a) => a)}
        <p class="warn-text" transition:fade>
            Are you sure you don't want anything?
        </p>
    {/if}
</div>
