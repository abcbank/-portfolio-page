<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트를 마치며</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 프로젝트 초기부터 물류 자동화는 예외 처리가 곤란해<br/>
            &nbsp;&nbsp;힘들겠거니 생각했었음
            - 전반적으로 내가 만드는 것과 대표님께서 얘기하는 것,<br/>
            &nbsp;&nbsp;그리고 고객사 측에서 원하는 것이 모두 다르다는 점에서<br/>
            &nbsp;&nbsp;의사소통에 대해 진지하게 고민하는 계기가 됨
            - 아쉬움도 많지만, 뭣보다 '소통하는 법'에 대해 진지하게 고민할 수<br/>
            &nbsp;&nbsp;있었음
            {:else}
            - 프로젝트 초기부터 물류 자동화는 예외 처리가 곤란해 힘들겠거니 생각했었음
            - 전반적으로 내가 만드는 것과 대표님께서 얘기하는 것, 그리고 고객사 측에서 원하는 것이 모두<br/>
            &nbsp;&nbsp;다르다는 점에서 의사소통에 대해 진지하게 고민하는 계기가 됨
            - 아쉬움도 많지만, 뭣보다 '소통하는 법'에 대해 진지하게 고민할 수 있는 계기가 됨
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>