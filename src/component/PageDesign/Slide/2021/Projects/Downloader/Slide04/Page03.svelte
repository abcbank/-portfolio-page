<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>시퀀스</p>
    <div style="width: 100%; font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - 다양한 다운로드와 검사를 유동적으로 수행해야 함<br/>
            - 따라서 전체 시퀀스를 표 형식으로 저장<br/>
        </p>
        <p style="font-size:{calcSubFontSize() * 0.8 }rem;">
            &nbsp; &nbsp; &nbsp; &nbsp;- 행: 수행 파라미터<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;- 열: 수행 순서
        </p>
    </div>
</DefaultPage>