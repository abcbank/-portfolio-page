<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>프로젝트를 마치며</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 개인적으론 Cognex Vision Pro를 제일<br/>
            &nbsp;&nbsp;많이 배웠던 프로젝트라 생각함<br/>
            - 여유 시간도 있었다보니, 이것저것 파라미터도<br/>
            &nbsp;&nbsp;많이 건들여볼 수 있었음<br/>
            - 마무리가 너무 어이가 없어서 그렇지....
            {:else}
            - 개인적으론 Cognex Vision Pro를 제일 많이 배웠던 프로젝트라 생각함<br/>
            - 여유 시간도 있었다보니, 이것저것 파라미터도 많이 건들여볼 수 있었음<br/>
            - 마무리가 너무 어이가 없어서 그렇지....
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>