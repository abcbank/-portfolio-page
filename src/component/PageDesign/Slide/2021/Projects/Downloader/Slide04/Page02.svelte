<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>펌웨어 업로딩</p>
    <div style="width: 100%; font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - 아쎄이의 각 PCB에 펌웨어를 업로드<br/>
            - Cheetah SPI 모듈을 사용해 업로딩 진행<br/>
            - 모듈의 통신선과 PCB의 통신핀을 리노핀을 통해 쇼트<br/>
            - 지정된 외부 프로그램을 실행
        </p>
    </div>
</DefaultPage>