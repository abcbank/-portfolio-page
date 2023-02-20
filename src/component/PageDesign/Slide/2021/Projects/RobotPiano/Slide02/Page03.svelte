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
        - 전반적인 시스템 설계<br/>
        - 소프트웨어 설계
    </div>
</DefaultPage>

<style>
    
</style>