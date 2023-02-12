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
    <p>전류계 통신</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - 전류계가 가끔 값을 요청해도 응답하지 않는 경우가 발생<br/>
            - 요청 주기가 빠를수록 더 빈번하게 발생<br/>
            - 전류계 내부 기판의 성능의 문제로 판단
        </p>
    </div>
</DefaultPage>
<style>
</style>