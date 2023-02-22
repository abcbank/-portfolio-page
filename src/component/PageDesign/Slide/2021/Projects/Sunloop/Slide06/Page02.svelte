<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>이미지 번짐</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 카메라 노출 시간을 대기하지 않고 카메라를<br/>
            &nbsp;&nbsp;이동해 번짐 발생<br/>
            - 일부 경우, 이동 완료 전 카메라 노출을 시작해<br/>
            &nbsp;&nbsp;번짐 발생<br/>
            - 가끔 정상적인 경우에도 번짐에 의해 불량으로<br/>
            &nbsp;&nbsp;판단
            {:else}
            - 카메라 노출 시간을 대기하지 않고 카메라를 이동해 번짐 발생<br/>
            - 일부 경우, 이동 완료 전 카메라 노출을 시작해 번짐 발생<br/>
            - 가끔 정상적인 경우에도 번짐에 의해 불량으로 판단
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>