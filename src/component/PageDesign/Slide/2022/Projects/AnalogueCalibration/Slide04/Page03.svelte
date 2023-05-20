<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>IO</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - Input<br/>
            &nbsp;&nbsp;- Start Switch<br/>
            &nbsp;&nbsp;- Emergency Switch<br/>
            &nbsp;&nbsp;- Hand Sensor<br/>
            - Output<br/>
            &nbsp;&nbsp;- Cylinder<br/>
            - 사용 모델: EZI-IO-EN-I/O16N (Fastech)<br/>
            {:else}
            - Input<br/>
            &nbsp;&nbsp;- Start Switch<br/>
            &nbsp;&nbsp;- Emergency Switch<br/>
            &nbsp;&nbsp;- Hand Sensor<br/>
            - Output<br/>
            &nbsp;&nbsp;- Cylinder<br/>
            - 사용 모델: EZI-IO-EN-I/O16N (Fastech)<br/>
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>