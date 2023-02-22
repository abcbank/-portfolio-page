<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Oscilloscope</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 전압 검사용 오실로스코프<br/>
            - C# SDK를 지원하는 모델로 구매<br/>
            - 지정된 시간동안 전압을 측정해, 데이터를 넘겨줌<br/>
            - 사용 모델: USBScope 102
        </p>
    </div>
</DefaultPage>
<style>
</style>