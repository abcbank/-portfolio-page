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
    <p>Raspberry PI</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 파이썬 기반 스트립트를 전원을 켰을때 자동 실행<br/>
            - http 서버를 시연용 동작 구현<br/>
            - 현재 이미지 / 영상 확인<br/>
            - IP를 통해 접속 후 각 버튼을 통해 모터들을 제어
        </p>
    </div>
</DefaultPage>
<style>
</style>