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
    <p>Photo Sensor</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 지그 하단에서 빛을 받아 빛의 밝기를 수치화<br/>
            - 흑유리들의 포토센서 값과 현재 포토센서의 값을<br/>
            &nbsp;&nbsp;비교해 현재 차광도를 연산
        </p>
    </div>
</DefaultPage>
<style>
</style>