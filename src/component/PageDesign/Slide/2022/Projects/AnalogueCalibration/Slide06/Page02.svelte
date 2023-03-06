<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트를 마치며</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 처음으로 사내에서 타인의 코드를 접한 프로젝트<br/>
            - 크게 건드릴 부분은 없었지만, 일부 UI는 일일이<br/>
            &nbsp;&nbsp;그리는 방식으로 구현되어있어 수정하는데<br/>
            &nbsp;&nbsp;애먹었음<br/>
            - 그 전까지 UI 관련해 아무런 피드백을 안하다 납품<br/>
            &nbsp;&nbsp;당일에 이렇게 바꿔달라, 저렇게 바꿔달라 얘기해<br/>
            &nbsp;&nbsp;스트레스를 받기는 했음
            {:else}
            - 처음으로 사내에서 타인의 코드를 접한 프로젝트<br/>
            - 크게 건드릴 부분은 없었지만, 일부 UI는 일일이 그리는 방식으로 구현되어있어 수정하는데<br/>
            &nbsp;&nbsp;애먹었음<br/>
            - 그 전까지 UI 관련해 아무런 피드백을 안하다 납품 당일에 이렇게 바꿔달라, 저렇게 바꿔달라<br/>
            &nbsp;&nbsp;얘기해 스트레스를 받기는 했음
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>