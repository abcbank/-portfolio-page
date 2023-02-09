<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>이전 페이지를 보고 싶으실 경우,<br/>마우스 왼쪽을 더블 클릭해주세요</p>
</DefaultPage>