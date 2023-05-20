<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>차광도 제어</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 차광도는 작업자가 가변 저항을 돌려 조절<br/>
            - 차광도가 필요 이상으로 높을 경우, 가변 저항의 크기를 늘려 LCD에 가해지는 전압의 크기를 감소<br/>
            - 차광도가 필요 이상으로 낮을 경우, 가변 저항의 크기를 줄여 LCD에 가해지는 전압의 크기를 증가<br/>
            {:else}
            - 차광도는 작업자가 가변 저항을 돌려 조절<br/>
            - 차광도가 필요 이상으로 높을 경우, 가변 저항의<br/>
            &nbsp;&nbsp;LCD크기를 늘려 LCD에 가해지는 전압의 크기를 감소<br/>
            - 차광도가 필요 이상으로 낮을 경우, 가변 저항의 크기를<br/>
            &nbsp;&nbsp;LCD줄여 LCD에 가해지는 전압의 크기를 증가
            {/if}
        </p>
    </div>
</DefaultPage>