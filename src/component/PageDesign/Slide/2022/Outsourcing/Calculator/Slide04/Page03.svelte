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
    <p>main.py</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - exit이 선택되기 전까지 무한루프를 돌며<br/>
            &nbsp;&nbsp;사용자에게 옵션 선택을 유도<br/>
            - 옵션이 선택됐을 경우, 각 옵션에 알맞은<br/>
            &nbsp;&nbsp;파라미터를 입력<br/>
            - 파라미터가 알맞게 입력됐을 경우, 옵션에<br/>
            &nbsp;&nbsp;따른 기능을 수행
            {:else}
            - exit이 선택되기 전까지 무한루프를 돌며 사용자에게 옵션 선택을 유도<br/>
            - 옵션이 선택됐을 경우, 각 옵션에 알맞은 파라미터를 입력<br/>
            - 파라미터가 알맞게 입력됐을 경우, 옵션에 따른 기능을 수행
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>