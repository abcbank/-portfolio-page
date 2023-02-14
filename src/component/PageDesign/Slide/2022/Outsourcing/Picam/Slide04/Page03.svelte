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
    <p>Picamera</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 사진 / 영상 촬영용 파이 카메라
        </p>
    </div>
</DefaultPage>
<style>
</style>