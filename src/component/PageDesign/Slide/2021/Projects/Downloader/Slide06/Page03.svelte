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
            - 기성품을 수정하는 것은 불가능하다고 판단<br/>
            - 따라서 전류계와 통신하는 알고리즘을 수정<br/>
            - 전류값을 요청하고 일정 시간동안 응답이 없을 경우, 재요청
        </p>
    </div>
</DefaultPage>
<style>
</style>