<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2;
    fontSize = 1.25 * fontSize;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p style="font-size:{fontSize}rem;">PCB Downloader</p>
    <p style="font-size:{fontSize}rem;">PCB Inspector</p>
</DefaultPage>