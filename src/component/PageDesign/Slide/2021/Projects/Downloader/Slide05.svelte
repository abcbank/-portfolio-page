<script>
    import { Device, Color, season } from "../../../../../../global"
    import DefaultSlide from '../../../defaultSlide.svelte'
    export let color;

    const calcMainFontSize = () => !$Device["isMobile"] ? 2 : 2;
    const calcSubFontSize = () => !$Device["isMobile"] ? 1.5 : 1;
</script>

<DefaultSlide>
    <div class="context" style="color:{color}; font-size:{calcMainFontSize()}rem;">
        <p>동작 검사 종류</p>
        <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
            <p>
                - 잔류 전류 검사<br/>
                - 대기 전류 검사<br/>
                - 전압 검사<br/>
                - IR 동작 검사(Inspector Only)<br/>
                - LED 동작 검사(Inspector Only)
            </p>
        </div>
    </div>
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