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
    <p>PC</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 전반적인 스퀀스를 통제하는 PC<br/>
            - 트리거를 통해 알고리즘을 수행하고, 그에 결과를<br/>
            &nbsp;&nbsp;통해 로봇 팔 제어<br/>
            - 사내 PC 사용
            {#if $Device["isSmallScreen"]}
            - 전반적인 스퀀스를 통제하는 PC<br/>
            - 트리거를 통해 알고리즘을 수행하고, 그에 결과를<br/>
            &nbsp;&nbsp;통해 로봇 팔 제어<br/>
            - 사내 PC 사용
            {:else}
            - 전반적인 스퀀스를 통제하는 PC<br/>
            - 트리거를 통해 알고리즘을 수행하고, 그에 결과를 통해 로봇 팔 제어<br/>
            - 사내 PC 사용
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>