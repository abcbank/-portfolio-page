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
            - 현대차의 선루프 제조 업체의 외주<br/>
            - 선루프의 플라스틱 프레임을 제작 및검사 장비를 제작 요청<br/>
            - 전체 장비 중 검사 및 카메라 제어 관련 프로세스 담당
            {:else}
            - 현대차의 선루프 제조 업체의 외주<br/>
            - 선루프의 플라스틱 프레임을 제작 및 검사 장비를 제작 요청
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>