<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
</script>

<DefaultPage color={color} fontSize={head}>
    <h1>Barcode Collector</h1>
</DefaultPage>