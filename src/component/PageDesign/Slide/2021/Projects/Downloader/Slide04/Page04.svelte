<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>시퀀스-행</p>
    <div style="width: 100%;font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - 총 다섯 가지의 파라미터 구성<br/>
        </p>
        <p style="font-size:{calcSubFontSize() * 0.8 }rem;">
            &nbsp; &nbsp; &nbsp; &nbsp;1. Task: 수행 작업<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;2. Target: 수행 대상<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;3. Value: 허용치<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;4. Min: 허용 최소값<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;5. Max: 허용 최대값<br/>
        </p>
        <p>
            - 선택된 파라미터를 기반으로 지정된 동작을 수행
        </p>
    </div>
</DefaultPage>