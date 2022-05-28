<script lang="ts">
    import Switch from "@smui/switch";
    import FormField from "@smui/form-field";
    import { slide } from "svelte/transition";

    // TODO combine into singular block
    // interface AlertSettings {
    //     sound: boolean;
    //     popup: boolean;
    //     flashing: boolean;
    // }
    // let alerts: AlertSettings;

    let sound: boolean;
    let popup: boolean;
    let flashing: boolean;
</script>

<div>
    <p>How do you want to be alerted?</p>
    <div>
        <FormField>
            <Switch bind:checked={sound} /><span slot="label">Sound</span>
        </FormField>
    </div>
    <div>
        <FormField>
            <Switch bind:checked={popup} /><span slot="label">Popup</span>
        </FormField>
    </div>
    <div>
        <FormField>
            <Switch bind:checked={flashing} /><span slot="label">Flashing</span>
        </FormField>
    </div>

    {#if !sound && !popup && !flashing}
        <p transition:slide>Are you sure you don't want anything?</p>
    {/if}
</div>
