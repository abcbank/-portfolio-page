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
            {#if $Device["isSmallScreen"]}
            - 사내 브랜드 홈페이지 중 일부 의도와 다르게<br/>
            &nbsp;&nbsp;완성된 사항 수정
            {:else}
            - 사내 브랜드 홈페이지 중 일부 의도와 다르게 완성된 사항 수정
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>