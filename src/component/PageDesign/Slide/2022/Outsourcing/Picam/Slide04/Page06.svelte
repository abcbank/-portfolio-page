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
    <p>Motor 2</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 간식 던져주는용 모터
        </p>
    </div>
</DefaultPage>
<style>
</style>