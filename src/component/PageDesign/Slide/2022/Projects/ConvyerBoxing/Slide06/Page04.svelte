<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>통신 속도에 의한 딜레이</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 접점을 읽어올 때, 필요 이상의 시간이 소요<br/>
            - 특히 모니터링을 위해 많은 접점을 읽어야 하는 바,<br/>
            &nbsp;&nbsp;UI가 버벅일 정도로 심한 딜레이가 발생
            {:else}
            - 접점을 읽어올 때, 필요 이상의 시간이 소요<br/>
            - 특히 모니터링을 위해 많은 접점을 읽어야 하는 바, UI가 버벅일 정도로 심한 딜레이가 발생
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>