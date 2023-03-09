<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>수행 직무</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 카메라 제어<br/>
            - 제품 탐색 알고리즘 고안<br/>
            - 로봇팔 제어
            {:else}
            - 카메라 제어<br/>
            - 제품 탐색 알고리즘 고안<br/>
            - 로봇팔 제어
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>