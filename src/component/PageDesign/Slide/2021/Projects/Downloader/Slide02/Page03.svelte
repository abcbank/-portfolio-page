<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>PCB 다운로더</p>
    <div style="width: 100%;font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            1. 네 개의 PCB가 아쎄이 형태로 로딩<br/>
            2. 각 PCB에 펌웨어를 업로드<br/>
            3. 지정된 검사를 수행해 업로드 직후 PCB의 불량 여부 파악
        </p>
    </div>
</DefaultPage>

<style>
    
</style>