<script>
    import { Device, Color, season } from "../../../../../../global"
    import DefaultSlide from '../../../defaultSlide.svelte'
    export let color;

    const calcMainFontSize = () => !$Device["isMobile"] ? 2 : 2;
    const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;
</script>

<DefaultSlide>
    <div class="context" style="color:{color}; font-size:{calcMainFontSize}rem;">
        <div style="font-size:{calcMainFontSize()}">
            프로젝트 목적
        </div>
        <div style="font-size:{calcSubFontSize()}">
            1. 기구의 카메라의 영상을 외부 디바이스로 확인<br/>
            2. 라즈베리파이와 파이카메라 사용<br/>
            3. 외부 디바이스는 특정 트리거를 통해 기구의 동작을 제어
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