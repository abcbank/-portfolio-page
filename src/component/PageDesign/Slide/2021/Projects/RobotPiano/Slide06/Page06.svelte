<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>아두이노의 성능 저하</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 아두이노의 반응속도로 인해 제때 실린더가<br/>
            &nbsp;&nbsp;내려가지 않음
            {:else}
            - 아두이노의 반응속도로 인해 제때 실린더가 내려가지 않음
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>