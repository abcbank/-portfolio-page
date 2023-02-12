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
    <p>사진 / 영상 전송 방식</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - 기존엔 와이파이로 촬영된 사진을 내려받는 형식으로 진행하려고 했음.<br/>
            - 그러나 해당 방식의 경우, 사진 / 영상의 갱신 속도가 매우 느렸음.
        </p>
    </div>
</DefaultPage>
<style>
</style>