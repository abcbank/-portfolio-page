<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>PLC-PC Communication</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - PLC-PC 사이의 MESLEC 프로토콜 구현<br/>
        </p>
    </div>
</DefaultPage>
<style>
</style>