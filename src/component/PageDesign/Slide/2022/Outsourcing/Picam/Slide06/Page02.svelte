<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>이미지의 불연속성</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 이것저것 테스트하는 과정에서 이미지 갱신 속도를<br/>
            &nbsp;&nbsp;높일 필요성을 느낌
            {:else}
            - 이것저것 테스트하는 과정에서 이미지 갱신 속도를 높일 필요성을 느낌
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>