<script>
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
</script>

<DefaultPage color={color} fontSize={head}>
    <h2>Trouble Shooting</h2>
</DefaultPage>