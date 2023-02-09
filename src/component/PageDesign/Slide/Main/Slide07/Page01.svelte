<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>
        다만 일부 배경의 경우, 컴퓨터 사양에 따라
        <br/>
        렉이 걸릴 수 있으니 참고해주세요.</p>
</DefaultPage>