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
            - PLC 레더 프로그래밍 보조<br/>
            - PLC 모니터링용 C# 프로그램 제작
        </p>
    </div>
</DefaultPage>

<style>
    
</style>