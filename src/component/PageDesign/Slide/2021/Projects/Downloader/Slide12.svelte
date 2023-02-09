<script>
    import { Device, Color, season } from "../../../../../../global"
    import DefaultSlide from '../../../defaultSlide.svelte'
    export let color;

    const calcMainFontSize = () => !$Device["isMobile"] ? 2 : 2;
    const calcSubFontSize = () => !$Device["isMobile"] ? 1.5 : 1;
</script>

<DefaultSlide>
    <div class="context" style="color:{color}; font-size:{calcMainFontSize()}rem;">
        <p>Inspector 시퀀스 설계</p>
        <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
            <p>
                1. Power On<br/>
                2. 전압 측정 - 전압 검사<br/>
                3. 전압 측정 시작<br/>
                4. IR LED On<br/>
                5. 전압 측정 종료 - IR 동작 검사<br/>
                6. LED On <br/>
                7. 전압 측정 시작<br/>
                8. 전압 측정 종료 - LED 동작 검사<br/>
                10. IR LED / LED Off<br/>
                11. 전류 측정 - 대기 전류 검사<br/>
                12. Power Off<br/>
                13. 전류 측정 - 잔류 전류 검사<br/>
                14. 시퀀스 종료
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