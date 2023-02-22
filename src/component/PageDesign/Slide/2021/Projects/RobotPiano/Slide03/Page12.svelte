<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <p>곡의 연주</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 총 두 가지 방식으로 연주 진행<br/>
            &nbsp;&nbsp;1. Normal 방식<br/>
            &nbsp;&nbsp;2. Snap 방식<br/>
            - 두 방식은 전체적인 양상은 비슷하나, 건반을<br/>
            &nbsp;&nbsp;때리는 방식에서 차이가 있음
            {:else}
            - 총 두 가지 방식으로 연주 진행<br/>
            &nbsp;&nbsp;1. Normal 방식<br/>
            &nbsp;&nbsp;2. Snap 방식<br/>
            - 두 방식은 전체적인 양상은 비슷하나, 건반을 때리는 방식에서 차이가 있음
            {/if}
        </p>
    </div>
</DefaultPage>