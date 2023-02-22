<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p style="font-size:{context}rem;">
        아쉽게도 이 프로젝트는 촬영된 결과가 없답니다<br/>
        항상 사진 및 영상 촬영을 생활화합시다...ㅠㅠ
    </p>
</DefaultPage>
<style>
</style>