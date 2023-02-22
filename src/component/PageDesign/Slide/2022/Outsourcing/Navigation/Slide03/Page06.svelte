<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>고속도로 연결 상태 정의 - 예외</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 일부 예외 고속도로의 경우, 시작점을 지정
        </p>
    </div>
</DefaultPage>