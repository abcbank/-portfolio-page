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
            - 접점은 곧 1bit를 의미<br/>
            - 즉, 최대 32개의 접점을 정수형 형태로 한번에<br/>
            &nbsp;&nbsp;읽어올 수 있음<br/>
            - PLC 상에서 최대한 접점을 붙여 사용하고, 이를<br/>
            &nbsp;&nbsp;한꺼번에 읽어오는 형태로 구현해 통신 횟수를 최소화
            {:else}
            - 접점은 곧 1bit를 의미<br/>
            - 즉, 최대 32개의 접점을 정수형 형태로 한번에 읽어올 수 있음<br/>
            - PLC 상에서 최대한 접점을 붙여 사용하고, 이를 한꺼번에 읽어오는<br/>
            &nbsp;&nbsp;형태로 구현해 통신 횟수를 최소화
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>