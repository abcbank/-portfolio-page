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
            - 순환 고속도로의 경우, 시작점을 지정<br/>
            - 일부 예외 간선에 대해서만 연결 상태를 지정
        </p>
    </div>
</DefaultPage>
<style>
</style>