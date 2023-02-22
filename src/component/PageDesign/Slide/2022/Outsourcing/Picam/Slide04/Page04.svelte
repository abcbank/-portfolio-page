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
    <p>Kakao Map</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 웹크롤링을 통해 JC의 정확한 위치 정보를<br/>
            &nbsp;&nbsp;알아내는 것은 힘들다고 판단<br/>
            - 따라서 안정성이 보장된 카카오맵 api를<br/>
            &nbsp;&nbsp;사용해 JC의 위치를 탐색<br/>
            - 사용자에게 지도 모형을 제공
            {:else}
            - 웹크롤링을 통해 JC의 정확한 위치 정보를 알아내는 것은 힘들다고 판단<br/>
            - 따라서 안정성이 보장된 카카오맵 api를 사용해 JC의 위치를 탐색<br/>
            - 사용자에게 지도 모형을 제공
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>