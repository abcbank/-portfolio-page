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
            - 어쩌다보니 PLC를 다루게 된 프로젝트<br/>
            - 하다하다 레더까지 짜보네...<br/>
            - 문제는 역시 대표님들끼리 제대로 소통되지 않아<br/>
            &nbsp;&nbsp;발생하는 부분이 많이 보임<br/>
            - 요구사항은 대부분 구현했지만, '이게 진짜로<br/>
            &nbsp;&nbsp;쓸모있나'라는 부분에 대해선 만들면서도 의문이<br/>
            &nbsp;&nbsp;많이 들었음.<br/>
            - 결과적으론 안쓰이고 방치된 상태라카더라
            {:else}
            - 어쩌다보니 PLC를 다루게 된 프로젝트<br/>
            - 하다하다 레더까지 짜보네...<br/>
            - 문제는 역시 대표님들끼리 제대로 소통되지 않아 발생하는 부분이 많이 보임<br/>
            - 요구사항은 대부분 구현했지만, '이게 진짜로 쓸모있나'라는 부분에 대해선 만들면서도 의문이<br/>
            &nbsp;&nbsp;많이 들었음.<br/>
            - 결과적으론 안쓰이고 방치된 상태라카더라
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>