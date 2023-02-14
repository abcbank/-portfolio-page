<script>
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 5
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>PCB Downloader</p>
    <p>PCB Inspector</p>
</DefaultPage>