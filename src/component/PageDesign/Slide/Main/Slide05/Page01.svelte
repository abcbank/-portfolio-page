<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? 2 : 1;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>
        이전 페이지를 보고 싶으실 경우,<br/>
        {#if $Device["isMobile"]}
            왼쪽 화면을 두번 터치해주세요
        {:else}
            오른쪽 마우스를 더블클릭해주세요
        {/if}
    </p>
</DefaultPage>