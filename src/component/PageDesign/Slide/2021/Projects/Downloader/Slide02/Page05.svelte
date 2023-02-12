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
            - C# 기반 PC 프로그램<br/>
            - C 기반 IO 펌웨어 프로그램<br/>
            - IO - PC 통신 프로토콜 설정
        </p>
    </div>
</DefaultPage>

<style>
    
</style>