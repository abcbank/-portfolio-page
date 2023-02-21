<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>PCB 다운로더</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            1. 네 개의 PCB가 아쎄이 형태로 로딩<br/>
            2. 각 PCB에 펌웨어를 업로드<br/>
            3. 지정된 검사를 수행해 업로드 직후<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;PCB의 불량 여부 파악
            {:else}
            1. 네 개의 PCB가 아쎄이 형태로 로딩<br/>
            2. 각 PCB에 펌웨어를 업로드<br/>
            3. 지정된 검사를 수행해 업로드 직후 PCB의 불량 여부 파악
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>