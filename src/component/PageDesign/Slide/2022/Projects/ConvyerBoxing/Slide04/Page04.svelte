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
    <p>Product Convyer</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 제품을 로딩할 컨베이어<br/>
            - 사람이 포장할 제품을 하나씩 배치<br/>
            - 이동하며 제품이 있다고 감지될 경우, 실린더를<br/>
            &nbsp;&nbsp;통해 밀어 제품을 박스에 넣음<br/>
            - PLC에 의해 제어
            {:else}
            - 제품을 로딩할 컨베이어<br/>
            - 사람이 포장할 제품을 하나씩 배치<br/>
            - 이동하며 제품이 있다고 감지될 경우, 실린더를 통해 밀어 제품을 박스에 넣음<br/>
            - PLC에 의해 제어
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>