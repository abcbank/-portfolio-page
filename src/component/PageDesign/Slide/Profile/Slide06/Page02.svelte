<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color}>
    <p style="font-size: {calcSubFontSize()}rem;">나름 이것저것 넣어 꾸며봤답니다</p>
</DefaultPage>