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
    <p>Robot Hand</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 제품 운송용 컨베이어<br/>
            - 사내 남아있던 재고를 사용
        </p>
    </div>
</DefaultPage>
<style>
</style>