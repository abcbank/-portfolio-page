<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p fontSize={context}>
        아쉽게도 본체 사진은 찍어둔 것이 없어<br/>프로그램 영상으로만 대체
    </p>
</DefaultPage>
<style>
</style>