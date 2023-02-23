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
    <p>Pi Camera</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 라즈베리 파이에 부착<br/>
            - 데모 버전에서 반려동물의 이미지를 가져오기 위해 사용
        </p>
    </div>
</DefaultPage>
<style>
</style>