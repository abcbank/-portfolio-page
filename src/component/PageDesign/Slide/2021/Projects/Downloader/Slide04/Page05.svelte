<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>시퀀스-수행 작업</p>
    <div style="width: 100%; font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - 어떤 작업을 수행할지 결정<br/>
        </p>
        <p style="font-size:{calcSubFontSize() * 0.8 }rem;">
            &nbsp; &nbsp; &nbsp; &nbsp;1. Delay: 대기<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;2. Voltage: 전압 검사<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;3. Frequency Preset: 주파수 검사 시작<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;4. Frequency: 주파수 검사 종료<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;5. Power On: PCB 전원 On<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;5. Power Off: PCB 전원 Off <br/>
            &nbsp; &nbsp; &nbsp; &nbsp;5. IR On: IR On<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;5. IR Off: IR Off <br/>
            &nbsp; &nbsp; &nbsp; &nbsp;5. LED On: LED On<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;5. LED Off: LED Off<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;5. SPI Download: PCB에 펌웨어 업로드 
        </p>
    </div>
</DefaultPage>