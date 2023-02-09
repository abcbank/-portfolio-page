<script>
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>프로젝트 개요</p>
</DefaultPage>