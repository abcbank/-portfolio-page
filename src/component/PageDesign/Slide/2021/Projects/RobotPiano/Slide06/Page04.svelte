<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>연음 처리</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 위의 알고리즘에서, 연음을 정상적으로 인식하지<br/>
            &nbsp;&nbsp;못하는 경우가 발생<br/>
            - 기존 알고리즘에선 쉼표를 직전 음이 끝나는<br/>
            &nbsp;&nbsp;시점을 통해 인식했는데, 연음의 경우 직전 음이<br/>
            &nbsp;&nbsp;아님에도 눌릴 수 있다는 점을 간과
            {:else}
            - 위의 알고리즘에서, 연음을 정상적으로 인식하지 못하는 경우가 발생<br/>
            - 기존 알고리즘에선 쉼표를 직전 음이 끝나는 시점을 통해 인식했는데, 연음의 경우<br/>
            &nbsp;&nbsp;직전 음이 아님에도 눌릴 수 있다는 점을 간과
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>