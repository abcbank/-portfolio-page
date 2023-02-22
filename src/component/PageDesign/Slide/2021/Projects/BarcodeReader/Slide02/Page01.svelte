<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
</script>

<DefaultPage color={color} fontSize={head}>
    <h2 style="font-size:{head}rem;">Outline</h2>
</DefaultPage>