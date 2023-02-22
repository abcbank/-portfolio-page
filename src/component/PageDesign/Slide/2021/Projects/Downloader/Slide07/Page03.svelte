<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 한계</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 첫 장비다보니 여러모로 부족한 점이 많음<br/>
            - 설계상 구동부와 컨트롤 박스를 이상하게 분리<br/>
            - 터치 스크린 해상도 등을 고려하면 이제와선<br/>
            &nbsp;&nbsp;사용자를 전혀 고려 안한 프로젝트란 생각이 듦
            {:else}
            - 첫 장비다보니 여러모로 부족한 점이 많음<br/>
            - 설계상 구동부와 컨트롤 박스를 이상하게 분리<br/>
            - 터치 스크린 해상도 등을 고려하면 이제와선 사용자를 전혀 고려 안한 프로젝트란<br/>
            &nbsp;&nbsp;생각이 듦
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>