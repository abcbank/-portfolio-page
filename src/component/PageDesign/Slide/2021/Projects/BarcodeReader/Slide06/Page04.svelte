<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>스트로브 기능 구현</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 스트로브 기능이 필요한 일부 상황이<br/>
            &nbsp;&nbsp;있었으나, 스트로브 기능을 지원하지 않는<br/>
            &nbsp;&nbsp;광원 컨트롤러를 사용
            {:else}
            - 스트로브 기능이 필요한 일부 상황이 있었으나, 스트로브 기능을 지원하지<br/>
            &nbsp;&nbsp;않는 광원 컨트롤러를 사용
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>