<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>관성에 의한 번짐 발생</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 이동 완료 후 로봇팔에 부착된 카메라가 관성에<br/>
            &nbsp;&nbsp;의해 흔들리며 이미지 번짐이 발생
            {:else}
            - 이동 완료 후 로봇팔에 부착된 카메라가 관성에 의해 흔들리며 이미지<br/>
            &nbsp;&nbsp;번짐이 발생
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>