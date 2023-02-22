<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 목적</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - PCB에 펌웨어를 넣는 작업을 자동화<br/>
            - PCB에 대해 지정된 검사를 진행해 PCB의<br/>
            &nbsp;&nbsp;불량 여부를 사전 파악
            {:else}
            - PCB에 펌웨어를 넣는 작업을 자동화<br/>
            - PCB에 대해 지정된 검사를 진행해 PCB의 불량 여부를 사전 파악
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>