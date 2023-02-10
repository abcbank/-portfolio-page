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
    <p>PC</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - C# 기반 프로그램을 사용<br/>
            - 다른 모듈과 통신<br/>
            - 전반적인 시퀀스 및 동작 제어
        </p>
    </div>
</DefaultPage>
<style>
</style>