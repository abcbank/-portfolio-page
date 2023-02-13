<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'
    import { onMount } from 'svelte'
    import { fade } from "svelte/transition"

    export let color = "transparent";
    export let fontSize = 2

    const calcMainFontSize = () => !$Device["isMobile"] ? fontSize : fontSize;
    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p style="font-size:{calcSubFontSize()}rem;">이 홈페이지는 이렇게 슬라이드와 페이지,<br/>두가지 방식으로 구성했답니다.</p>
</DefaultPage>