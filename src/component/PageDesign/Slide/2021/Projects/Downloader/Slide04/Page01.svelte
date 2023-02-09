<script>
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>주요 기능</p>
</DefaultPage>