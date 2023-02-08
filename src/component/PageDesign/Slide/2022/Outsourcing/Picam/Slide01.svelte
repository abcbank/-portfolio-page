<script>
    import { Device, Color, season } from "../../../../../../global"
    import DefaultSlide from '../../../defaultSlide.svelte'
    
    export let color;

    const calcMainFontSize = () => !$Device["isMobile"] ? 2 : 2;
    const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;
</script>

<DefaultSlide>
    {#if !$Device["isMobile"]}
    <div class="context" style="color:{color}; font-size:{calcMainFontSize()}rem;">
        <p>Picamera Server</p>
    </div>
    {/if}
</DefaultSlide>

<style>
    .context{
		display: flex;
        text-align:center;
	    align-items: center;
		justify-content: center;
        width:100%;
        height:100%;
        overflow: hidden; 
        white-space: nowrap;
        flex-direction:column;
    }
</style>