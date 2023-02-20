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
            - 가장 좋은 방법은 더욱 좋은 IO카드를 사용하는 것<br/>
            - 다만 비용 문제 등으로 인해 실질적으로 행하진 않음
        </p>
    </div>
</DefaultPage>
<style>
</style>