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
    <h3>PC</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 전반적인 로봇과 IO 동작을 제어<br/>
            - midi 곡을 읽어 적절한 형태로 가공<br/>
            - 가공된 데이터를 통해 실질적인 연주 수행<br/>
            - 사용 모델: 사내 컴퓨터<br/>
            &nbsp;&nbsp;- CPU: Ryzen7-5800<br/>
            &nbsp;&nbsp;- GPU: GTX 1050 Ti<br/>
            &nbsp;&nbsp;- RAM: 16GB
        </p>
    </div>
</DefaultPage>
<style>
</style>