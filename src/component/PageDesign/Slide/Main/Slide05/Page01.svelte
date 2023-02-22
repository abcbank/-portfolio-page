<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={context}>
    <p>
        이전 페이지를 보고 싶으실 경우,<br/>
        {#if $Device["isMobile"]}
            화면의 왼쪽을 두번 터치해주세요
        {:else}
            오른쪽 마우스를 더블클릭해주세요
        {/if}
    </p>
</DefaultPage>