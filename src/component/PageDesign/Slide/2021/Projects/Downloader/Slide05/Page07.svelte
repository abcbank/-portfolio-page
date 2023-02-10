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
    <p>Solution</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - USBScope 102에 전압이 들어가기 전, 회로적으로 강하를 수행<br/>
            - 저항을 통해 실제 전압의 10%만 측정되도록 설계
        </p>
    </div>
</DefaultPage>
<style>
</style>