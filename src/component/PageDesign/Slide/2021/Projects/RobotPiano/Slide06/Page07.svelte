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
            - 스트로브와 유사하게 동작하도록 프로그램 구성<br/>
            - 실제 주요 기능을 따라 구현하긴 힘드나, 최소한<br/>
            &nbsp;&nbsp;스트로브를 수행하는 것처럼 보일 필요가<br/>
            &nbsp;&nbsp;있었음.
            {:else}
            - 스트로브와 유사하게 동작하도록 프로그램 구성<br/>
            - 실제 주요 기능을 따라 구현하긴 힘드나, 최소한 스트로브를 수행하는 것처럼<br/>
            &nbsp;&nbsp;보일 필요가 있었음.
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>