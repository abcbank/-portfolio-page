<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 목적</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 반려동물이 반려인이 자택에 없는 경우, 외로움을<br/>
            &nbsp;&nbsp;심하게 탐<br/>
            - 반대로 반려인은 자택에 없는 경우, 반려동물의 상태를<br/>
            &nbsp;&nbsp;정확히 파악하기 힘듦
            - 이를 개선하기 위한 장치 개발
            {:else}
            - 반려동물이 반려인이 자택에 없는 경우, 외로움을 심하게 탐<br/>
            - 반대로 반려인은 자택에 없는 경우, 반려동물의 상태를 정확히 파악하기 힘듦
            - 이를 개선하기 위한 장치 개발
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>