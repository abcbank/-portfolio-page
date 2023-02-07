<script>
    import { Device } from "../../../../global"
    import DefaultSlide from '../defaultSlide.svelte'
    export let color;
    
    const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;
</script>

<DefaultSlide>
    <div class="context" style="color:{color}; font-size:{calcSubFontSize()}rem;">
        <div class="header" style="width:100%; height:100%;">
            얼마 없는 감각으로 나름 열심히 꾸며 봤답니다.
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