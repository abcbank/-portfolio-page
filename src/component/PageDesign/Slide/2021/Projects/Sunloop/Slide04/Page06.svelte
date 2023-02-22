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
            {#if $Device["isSmallSreen"]}
            - 테스트 진행용 로봇팔<br/>
            - 원래 프로세스는 선루프를 로봇팔로 이동하는 <br/>
            &nbsp;&nbsp;방식이었으나, 테스트 단계에선 카메라를 로봇팔에<br/>
            &nbsp;&nbsp;부착 후 카메라를 이동하는 방식으로 진행
            - 사내의 남아있는 재고 사용
            - 사용 모델: VS-6556 / RC-8<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            (Denso)
            {:else}
            - 테스트 진행용 로봇팔<br/>
            - 원래 프로세스는 선루프를 로봇팔로 이동하는 방식이었으나, 테스트 단계에선 카메라를 로봇팔에<br/>
            &nbsp;&nbsp;부착 후 카메라를 이동하는 방식으로 진행
            - 사내의 남아있는 재고 사용
            - 사용 모델: VS-6556 / RC-8 (Denso)
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>