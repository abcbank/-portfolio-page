<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize / 2;
</script>

<DefaultPage color={color} fontSize={calcSubFontSize()}>
    <p>
        {#if $Device["isMobile"]}
            그리고 슬라이드는 휠로도<br/>이동할 수 있답니다
        {:else}
            <p>그리고 슬라이드는 휠로도 이동할 수 있답니다
        {/if}
    </p>
</DefaultPage>