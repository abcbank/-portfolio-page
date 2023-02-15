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
    <p>전류계</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 전류 검사용 전류계<br/>
            - 시리얼 통신을 통해 현재 전류값 전달 가능<br/>
            - 사용 모델: P3857
        </p>
    </div>
</DefaultPage>
<style>
</style>