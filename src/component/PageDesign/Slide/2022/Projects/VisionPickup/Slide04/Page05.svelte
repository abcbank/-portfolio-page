<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Robot Arm</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 촬영 시 빛을 순간적으로 비춰주는 역할<br/>
            - 엘파인 제어기를 구매 후 사용<br/>
            - 사용 모델: LCP24-100Q
        </p>
    </div>
</DefaultPage>
<style>
</style>