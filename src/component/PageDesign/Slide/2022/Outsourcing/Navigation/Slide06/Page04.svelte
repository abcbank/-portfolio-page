<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>고속도로의 형태</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 순환 고속도로의 경우, 직선 형태가 아님<br/>
            - 고속도로의 일부분의 경우, 직선이 아닐 수 있음<br/>
            - 따라서 일부 고속도로의 실제 연결 상황과<br/>
            &nbsp;&nbsp;그래프의 간선이 일치하지 않음
            {:else}
            - 순환 고속도로의 경우, 직선 형태가 아님<br/>
            - 고속도로의 일부분의 경우, 직선이 아닐 수 있음<br/>
            - 따라서 일부 고속도로의 실제 연결 상황과 그래프의 간선이 일치하지 않음
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>