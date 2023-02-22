<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>프로젝트 목적</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 애완동물이 반려인이 자택에 없는 경우, 외로움을<br/>
            &nbsp;&nbsp;심하게 탐<br/>
            - 이를 개선하기 위한 장치 개발
            {:else}
            - 애완동물이 반려인이 자택에 없는 경우, 외로움을 심하게 탐<br/>
            - 이를 개선하기 위한 장치 개발
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>