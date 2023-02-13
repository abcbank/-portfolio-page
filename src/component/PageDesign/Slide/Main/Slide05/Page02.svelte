<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={calcSubFontSize()}>
    <p>이제 포트폴리오 보시는 법을 모두 설명 드렸네요!</p>
</DefaultPage>