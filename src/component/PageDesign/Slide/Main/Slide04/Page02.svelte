<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>그리고 슬라이드는 휠로도 이동할 수 있답니다.</p>
</DefaultPage>