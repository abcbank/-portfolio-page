<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>http 서버</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 얼추 가닥은 잡혔으나, http 서버에 대한 이해도가<br/>
            &nbsp;&nbsp;부족해 생기는 문제점 디버깅
            {:else}
            - 얼추 가닥은 잡혔으나, http 서버에 대한 이해도가 부족해 생기는 문제점 디버깅
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>