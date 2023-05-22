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
            - 결과적으론 필요없는 장비가 되서 크게<br/>
            &nbsp;&nbsp;의미를 두진 않음.<br/>
            - 새삼스레 물류 자동화가 얼마나 어려운<br/>
            &nbsp;&nbsp;과제인지 느낌<br/>
            - 물류를 제대로 자동화하려면 모든 부분을<br/>
            &nbsp;&nbsp;기계화하는 편이 효율적인 듯함.
            {:else}
            - 결과적으론 필요없는 장비가 되서 크게 의미를 두진 않음.<br/>
            - 새삼스레 물류 자동화가 얼마나 어려운 과제인지 느낌<br/>
            - 물류를 제대로 자동화하려면 모든 부분을 기계화하는 편이 효율적인 듯함.
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>