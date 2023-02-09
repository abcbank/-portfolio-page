<script>
    import { Device, Color, season } from "../../../../../../global"
    import DefaultSlide from '../../../defaultSlide.svelte'
    export let color;

    const calcMainFontSize = () => !$Device["isMobile"] ? 2 : 2;
    const calcSubFontSize = () => !$Device["isMobile"] ? 1.5 : 1;
</script>

<DefaultSlide>
    <div class="context" style="color:{color}; font-size:{calcMainFontSize()}rem;">
        <p>LED 동작 검사(Inspector Only)</p>
        <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
            <p>
                1. PCB 기판에 전원을 켬<br/>
                2. IR LED를 지정된 주파수로 On/Off<br/>
                3. 일반 LED를 On<br/>
                4. 전압 주파수 및 Pick to Pick 측정<br/>
                5. 각 값이 허용치 이내일 경우, 검사 통과
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