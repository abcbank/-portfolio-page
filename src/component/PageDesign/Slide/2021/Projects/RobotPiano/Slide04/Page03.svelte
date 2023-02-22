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
    <p>Treble Arm</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 사내 로봇팔 재고 사용<br/>
            - 높은음자리의 음표들 연주를 담당<br/>
            - 이더넷을 통해 PC와 통신<br/>
            - PC의 동작에 따라 위치 이동<br/>
            - 사용 모델: 
        </p>
    </div>
</DefaultPage>
<style>
</style>