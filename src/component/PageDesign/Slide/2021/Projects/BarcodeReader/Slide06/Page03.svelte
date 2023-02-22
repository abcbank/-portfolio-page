<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Solution</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 애초에 해당 문제에 대해 얘기가 됐다고<br/>
            &nbsp;&nbsp;전달받은 후 설계 진행<br/>
            - 근데 만들고 보니 제대로 얘기가 안됐엇네...?
            {:else}
            - 애초에 해당 문제에 대해 얘기가 됐다고 전달받은 후 설계 진행<br/>
            - 근데 만들고 보니 제대로 얘기가 안됐엇네...?
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>