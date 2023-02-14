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
            - USBScope 102에 전압이 들어가기 전, 회로적으로<br/>
            &nbsp;&nbsp;강하를 수행<br/>
            {:else}
            - USBScope 102에 전압이 들어가기 전, 회로적으로 강하를 수행<br/>
            - 저항을 통해 실제 전압의 10%만 측정되도록 설계
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>