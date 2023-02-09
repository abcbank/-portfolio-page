<script>
    import { Device, Color, season } from "../../../../../../global"
    import DefaultSlide from '../../../defaultSlide.svelte'
    export let color;

    const calcMainFontSize = () => !$Device["isMobile"] ? 2 : 2;
    const calcSubFontSize = () => !$Device["isMobile"] ? 1.5 : 1;
</script>

<DefaultSlide>
    <div class="context" style="color:{color}; font-size:{calcMainFontSize()}rem;">
        <p>시퀀스 편집</p>
        <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
            <p>
                - 상황에 따라 일부 시퀀스가 변경
                - 따라서 시퀀스 자체에 유동성 부여
                - 시퀀스를 파일 형태로 저장 / 변경
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