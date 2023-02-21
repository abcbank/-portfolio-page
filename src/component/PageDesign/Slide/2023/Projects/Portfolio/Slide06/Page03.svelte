<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Solution</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 기성품을 수정하는 것은 불가능하다고 판단<br/>
            - 따라서 전류계와 통신하는 알고리즘을 수정<br/>
            - 전류값을 요청하고 일정 시간동안 응답이<br/>
            &nbsp;&nbsp;없을 경우, 재요청
            {:else}
            - 기성품을 수정하는 것은 불가능하다고 판단<br/>
            - 따라서 전류계와 통신하는 알고리즘을 수정<br/>
            - 전류값을 요청하고 일정 시간동안 응답이 없을 경우, 재요청
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>