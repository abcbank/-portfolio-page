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
    <p>Motor</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 총 두개의 모터가 사용<br/>
            - Motor A: 간식을 발사할때 활용<br/>
            - Motor B: 카메라 위치 조정할때 사용
        </p>
    </div>
</DefaultPage>
<style>
</style>