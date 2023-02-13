<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} >
    <p fontSize={calcSubFontSize()}>
        다만 일부 배경의 경우, 사양에 따라
        <br/>
        렉이 걸릴 수 있습니다</p>
</DefaultPage>