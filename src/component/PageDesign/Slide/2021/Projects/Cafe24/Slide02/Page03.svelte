<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>수행 직무</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
        </p>
    </div>
</DefaultPage>

<style>
    
</style>