<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2;

    let CurPage = "main"

    console.log($Color["btnBackColor"][$season]);

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>Solution</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
        </p>
    </div>
</DefaultPage>
<style>
</style>