<script>
    import Icon from "../../../Icon/Icon.svelte"
    import { fade } from "svelte/transition"
    import { Device, Color, season } from "../../../../global"
    import DefaultSlide from '../defaultSlide.svelte'
    import { mdiArrowDownBoldOutline } from '@mdi/js';
    export let color;
    
    const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;
</script>

<DefaultSlide>
    <div class="context" style="color:{color};">
        <div class="header" style="width:100%; height:100%; font-size:{calcSubFontSize()}rem;">
            당연히, 아래 버튼을 통해서도 가능하구요.
        </div>
        <div class="footer" style="width:100%; height:70px;" in:fade={{delay:200, duration:200,}}>
        <Icon size="60px" color={$Color["foreColor"][$season]} path={mdiArrowDownBoldOutline} />
        </div>
    </div>
</DefaultSlide>

<style>
    .context{
        width:100%;
        height:100%;
        overflow: hidden; 
        white-space: nowrap;
    }
    .header{
		display: flex;
        text-align:center;
	    align-items: center;
		justify-content: center;
        width:100%;
        height:15%;
    }
    .footer{
        width:100%;
        position:absolute;
        bottom:0;
    }
</style>