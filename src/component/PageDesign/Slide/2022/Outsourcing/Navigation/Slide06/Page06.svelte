<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>CPython</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - CPython에서 매개변수 전달 방식이 매우매우<br/>
            &nbsp;&nbsp;헷갈림
            {:else}
            - CPython에서 매개변수 전달 방식이 매우매우 헷갈림
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>