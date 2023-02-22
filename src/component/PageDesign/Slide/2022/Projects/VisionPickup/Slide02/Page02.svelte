<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 목적</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 컨베이어 벨트에 있는 물건들을 검사하기 위한<br/>
            &nbsp;&nbsp;기구물 구성<br/>
            - 비전 기반으로 검사 수행<br/>
            - 양품에 대한 데이터를 학습 후 양품과<br/>
            &nbsp;&nbsp;불량품을 구별
            {:else}
            - 컨베이어 벨트에 있는 물건들을 검사하기 위한 기구물 구성<br/>
            - 비전 기반으로 검사 수행<br/>
            - 양품에 대한 데이터를 학습 후 양품과 불량품을 구별
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>