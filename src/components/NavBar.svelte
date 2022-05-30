<script lang="ts">
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton, { Icon } from "@smui/icon-button";
    import Tooltip, { Wrapper } from "@smui/tooltip";

    import { darkMode } from "../store";

    export let app_name: string;
    export let app_version: string;
</script>

<div class="nav-bar-container">
    <TopAppBar variant="standard" dense>
        <Row>
            <Section>
                <Title>{app_name} {app_version}</Title>
            </Section>
            <Section align="end" toolbar>
                <Wrapper>
                    <IconButton class="material-icons" href="https://github.com/ModischFabrications/Anti-FFRB" target="_blank">info</IconButton>
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
</div>

