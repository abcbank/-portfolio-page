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
            {#if $Device["isMobile"]}
            - 사실 처음엔 이걸 돈 받고 해줘도 되나 싶었음<br/>
            - 오히려 너무 어색하지 않도록 난이도를 자체<br/>
            &nbsp;&nbsp;조절하는게 더 어려웠음
            {:else}
            - 사실 처음엔 이걸 돈 받고 해줘도 되나 싶었음<br/>
            - 오히려 너무 어색하지 않도록 난이도를 자체 조절하는게 더 어려웠음
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>