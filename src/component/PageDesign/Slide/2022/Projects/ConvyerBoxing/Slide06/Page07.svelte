<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Solution</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 문제에 대해 그때그때 대응하는 방안으로 해결<br/>
            - 안 꺼지는 문제의 경우, 전원용 릴레이를 부착해<br/>
            &nbsp;&nbsp;해결<br/>
            - 켜진 직후 문제의 경우, 전원을 켠 직후 일정<br/>
            &nbsp;&nbsp;시간동안 부저를 제어하지 않는 방식으로 해결
            {:else}
            - 문제에 대해 그때그때 대응하는 방안으로 해결<br/>
            - 안 꺼지는 문제의 경우, 전원용 릴레이를 부착해 해결<br/>
            - 켜진 직후 문제의 경우, 전원을 켠 직후 일정 시간동안 부저를 제어하지 않는 방식으로 해결
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>