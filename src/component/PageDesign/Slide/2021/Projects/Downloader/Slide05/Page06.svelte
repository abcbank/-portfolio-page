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
    <p>펌웨어 업로드</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - 원래는 Cheetah SPI SDK를 통해 업로드용 라이브러리를 만들 생각이었음.<br/>
            - 다만, 업로드 후 정상적으로 동작하는지 확인할 방법이 없었음<br/>
            - 따라서 정상 동작에 대한 확신이 없어 라이브러리화는 취소
        </p>
    </div>
</DefaultPage>
<style>
</style>