<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>시퀀스-수행 대상</p>
    <div style="width: 100%; font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - 수행 작업의 대상을 결정<br/>
        </p>
        <p style="font-size:{calcSubFontSize() * 0.8 }rem;">
            &nbsp; &nbsp; &nbsp; &nbsp;1. Download - 기판 N 다운로드: N번 기판 업로드 진행<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;2. Power - 기판 N 전원: N번 기판 전원 On/Off<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;3. IR - IR N: N번 IR On/Off<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;4. Oscillo(V) - N V: N V 검사핀<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;5. Oscillo(F): 주파수 검사핀<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;5. LED: LED On/Off
        </p>
    </div>
</DefaultPage>