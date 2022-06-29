<script lang="ts">
    import { writable } from "svelte/store";
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton, { Icon } from "@smui/icon-button";
    import { Svg } from "@smui/common/elements";
    import Tooltip, { Wrapper } from "@smui/tooltip";
    import Fa from "svelte-fa";
    import { faGithub } from "@fortawesome/free-brands-svg-icons";

    export const darkMode = writable<boolean>(localStorage.darkMode == "true");
    darkMode.subscribe((value) => (localStorage.darkMode = String(value)));

    export let app_name: string;
    export let app_version: string;
</script>

<TopAppBar variant="static" dense>
    <Row>
        <Section>
            <Title>{app_name} {app_version}</Title>
        </Section>
        <Section align="end" toolbar>
            <Wrapper>
                <IconButton
                    class="material-icons"
                    href="https://github.com/ModischFabrications/Anti-FFRB"
                    target="_blank"
                >
                    <Icon component={Svg} viewBox="0 0 24 24">
                        <Fa icon={faGithub} />
                    </Icon>
                </IconButton>
                <Tooltip>View on GitHub</Tooltip>
            </Wrapper>
            <!-- <Wrapper>
                    <IconButton toggle bind:pressed={$darkMode}>
                        <Icon class="material-icons" on>light_mode</Icon>
                        <Icon class="material-icons">dark_mode</Icon>
                    </IconButton>
                    <Tooltip>Toggle Darkmode</Tooltip>
                </Wrapper> -->
        </Section>
    </Row>
</TopAppBar>
