<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2;

    let CurPage = "main"

    console.log($Color["btnBackColor"][$season]);

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>SPI</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - 펌웨어 업로드용 통신 모듈<br/>
            - 기존 업로드에 사용하던 프로그램을 그대로 실행<br/>
            - 사용  모델: Cheetah SPI
        </p>
    </div>
</DefaultPage>
<style>
</style>