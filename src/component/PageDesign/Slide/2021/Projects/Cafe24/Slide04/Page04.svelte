<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Cafe24의 이해</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 특정 상황에서 제품의 이름 등의 스타일 지정을<br/>
            &nbsp;&nbsp;못하는 등 시스템에 대한 이해 또한 문제가 됐음.
            {:else}
            - 특정 상황에서 제품의 이름 등의 스타일 지정을 못하는 등 시스템에 대한 이해 또한 문제가 됐음.
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>