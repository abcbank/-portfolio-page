<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;

</script>

<DefaultPage color={color} fontSize={context}>
    <p>
        {#if $Device["isMobile"]}
            그리고 슬라이드는 휠로도<br/>이동할 수 있답니다
        {:else}
            <p>그리고 슬라이드는 휠로도 이동할 수 있답니다
        {/if}
    </p>
</DefaultPage>