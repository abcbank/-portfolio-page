<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = $Device['isMobile'] ? 1 : 2;

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>프로젝트 목적</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            
            - PCB에 펌웨어를 넣는 작업을 자동화<br/>
            - PCB에 대해 지정된 검사를 진행해 PCB의 불량 여부를 사전 파악
            <!-- {#if $Device["isMobile"]}
            - PCB에 펌웨어를 넣는 작업을 자동화<br/>
            - PCB에 대해 지정된 검사를 진행해<br/>PCB의 불량 여부를 사전 파악
            {:else}
            {/if} -->
        </p>
    </div>
</DefaultPage>

<style>
    
</style>