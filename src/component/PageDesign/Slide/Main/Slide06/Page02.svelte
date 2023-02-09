<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>나름 이것저것 넣어 꾸며봤답니다</p>
</DefaultPage>