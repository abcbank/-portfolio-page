<script>
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={head}>
    <h2>Main Function</h2>
    <!-- <h2>Coming Soon...</h2> -->
</DefaultPage>