<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>택타임 및 로딩 조건</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 바코드가 항상 카메라 방향으로 조정해야하는것에서<br/>
            &nbsp;&nbsp;상당한 시간 로스 발생<br/>
            - 위치를 조정하고 촬영이 완료될때까지 택타임이 너무 긺
            {:else}
            - 바코드가 항상 카메라 방향으로 조정해야하는 것에서 상당한 시간 로스 발생<br/>
            - 위치를 조정하고 촬영이 완료될때까지 택타임이 너무 긺
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>