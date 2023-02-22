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
            {#if $Device["isSmallSreen"]}
            - 어느정도 만들고 난 후 보고드렸더니 갑자기<br/>
            &nbsp;&nbsp;프로젝트가 폭파됐다고 함<br/>
            - 띠용...
            {:else}
            - 어느정도 만들고 난 후 보고드렸더니 갑자기 프로젝트가 폭파됐다고 함<br/>
            - 띠용...
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>