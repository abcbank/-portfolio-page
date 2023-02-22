<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Image Acquire</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 이동하는 객체를 사진 촬영할 경우<br/>
            &nbsp;&nbsp;이미지의 번짐 현상이 발생<br/>
            {:else}
            - 이동하는 객체를 사진 촬영할 경우 이미지의 번짐 현상이 발생<br/>
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>