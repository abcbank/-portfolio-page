<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>calc.py</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 각 옵션에 해당되는 기능을 구현<br/>
            - main에선 calc의 메서드를 불러와 기능을 수행
        </p>
    </div>
</DefaultPage>
<style>
</style>