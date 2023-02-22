<script>
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
</script>

<DefaultPage color={color} fontSize={head}>
    <h2>Main Function</h2>
</DefaultPage>