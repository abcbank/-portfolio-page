<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>Solution</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 이동 시작 및 완료 이전 일정 시간동안 카메라<br/>
            &nbsp;&nbsp;촬영을 제한<br/>
            - 택타임은 늘어났으나, 기준치 이하의 값이라<br/>
            &nbsp;&nbsp;해당 방식으로 해결
            {:else}
            - 이동 시작 및 완료 이전 일정 시간동안 카메라 촬영을 제한<br/>
            - 택타임은 늘어났으나, 기준치 이하의 값이라 해당 방식으로 해결
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>