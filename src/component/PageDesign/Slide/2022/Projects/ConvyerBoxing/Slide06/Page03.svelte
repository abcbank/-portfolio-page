<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Solution</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 미스비시에서 지원하는 SDK를 확인, 이를 활용<br/>
            - 필요한 시리얼 번호는 구매처에서 제공
        </p>
    </div>
</DefaultPage>
<style>
</style>