<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>박스 전처리 시퀀스</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            1. FloorInv 영역에서 가장 작은 z 데이터 및 데이터의 좌표 추출
            2. 
            {/if}
        </p>
    </div>
</DefaultPage>