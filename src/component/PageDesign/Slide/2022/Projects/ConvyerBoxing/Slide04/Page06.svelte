<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>PC</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 산업용 컴퓨터(i3) 사용<br/>
            - PLC와 통신하며 PLC의 상태를 디스플레이
        </p>
    </div>
</DefaultPage>
<style>
</style>