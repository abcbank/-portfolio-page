<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color}>
    <p style="font-size: {calcSubFontSize()}rem;">제 주력 분야가 웹과 디자인이 아니지만...</p>
</DefaultPage>