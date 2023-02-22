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
            - 처음으로 진행한 비전 관련 프로젝트<br/>
            - 기존엔 비전에 대한 불신이 많았으나, Vision Pro를<br/>
            &nbsp;&nbsp;직접 사용해보며 비전에 대한 인식이 긍정적인<br/>
            &nbsp;&nbsp;방향으로 바뀌게 됨<br/>
            - 첫 프로젝트다 보니, Vision Pro SDK에 대한 이해도가<br/>
            &nbsp;&nbsp;낮아 모든 파라미터를 C# 코드 상으로 제어하진<br/>
            &nbsp;&nbsp;못했으나, 점차 퀵빌드를 사용하지 않는 방향으로 나아감<br/>
            - 나중에 다 끝나고 확인차 여쭤보니, 선루프 관련 비전 과제가<br/>
            &nbsp;&nbsp;들어와 실력 확인차 시켜보신거라카시더라...
            {:else}
            - 처음으로 진행한 비전 관련 프로젝트<br/>
            - 기존엔 비전에 대한 불신이 많았으나, Vision Pro를 직접 사용해보며 비전에 대한 인식이 긍정적인<br/>
            &nbsp;&nbsp;방향으로 바뀌게 됨<br/>
            - 첫 프로젝트다 보니, Vision Pro SDK에 대한 이해도가 낮아 모든 파라미터를 C# 코드 상으로 제어하진<br/>
            &nbsp;&nbsp;못했으나, 점차 퀵빌드를 사용하지 않는 방향으로 나아감
            - 나중에 다 끝나고 확인차 여쭤보니, 선루프 관련 비전 과제가 들어와 실력 확인차 시켜보신거라카시더라...
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>