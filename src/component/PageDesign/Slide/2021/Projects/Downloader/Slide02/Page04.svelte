<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>PCB 인스펙터</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            1. 하나의 가공된 PCB가 로딩<br/>
            2. 지정된 검사를 수행해 업로드 직후<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;PCB의 불량 여부 파악
        </p>
    </div>
</DefaultPage>

<style>
    
</style>