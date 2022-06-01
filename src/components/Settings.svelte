<script lang="ts">
    import Switch from "@smui/switch";
    import FormField from "@smui/form-field";
    import { fade } from "svelte/transition";

    export let alerts = {
        sound: true,
        popup: false,
        flashing: true,
    };
</script>

<div>
    <p>How do you want to be alerted?</p>
    <div>
        <FormField>
            <Switch bind:checked={alerts.sound} /><span slot="label">Sound</span>
        </FormField>
    </div>
    <div>
        <FormField>
            <Switch bind:checked={alerts.popup} /><span slot="label">Popup</span>
        </FormField>
    </div>
    <div>
        <FormField>
            <Switch bind:checked={alerts.flashing} /><span slot="label">Flashing</span>
        </FormField>
    </div>

    {#if !Object.values(alerts).some(a => a)}
        <p class="warn-text" transition:fade>Are you sure you don't want anything?</p>
    {/if}
</div>
