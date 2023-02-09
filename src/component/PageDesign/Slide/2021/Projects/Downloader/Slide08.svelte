<script>
    import { Device, Color, season } from "../../../../../../global"
    import DefaultSlide from '../../../defaultSlide.svelte'
    export let color;

    const calcMainFontSize = () => !$Device["isMobile"] ? 2 : 2;
    const calcSubFontSize = () => !$Device["isMobile"] ? 1.5 : 1;
</script>

<DefaultSlide>
    <div class="context" style="color:{color}; font-size:{calcMainFontSize()}rem;">
        <p>전압 검사</p>
        <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
            <p>
                1. PCB 기판에 전원을 켬<br/>
                2. 기판에 지정된 핀의 전압을 검사<br/>
                3. 측정된 전압이 허용치 사이의 값일 경우 검사 통과
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