<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>제품 컨베이어</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 택배 상자 하나에 포장할 제품들을 각 섹터별로<br/>
            &nbsp;&nbsp;배치<br/>
            - 컨베이어가 돌며 적외선 센서를 통해 각 섹터를<br/>
            &nbsp;&nbsp;검사하고, 그 섹터에 제품이 있을 경우 실린더를 통해 박스에 넣어줌
            {:else}
            - 택배 상자 하나에 포장할 제품들을 각 섹터별로 배치<br/>
            - 컨베이어가 돌며 적외선 센서를 통해 각 섹터를 검사하고, 그 섹터에 제품이 있을<br/>
            &nbsp;&nbsp;경우 실린더를 통해 박스에 넣어줌
            {/if}
        </p>
    </div>
</DefaultPage>