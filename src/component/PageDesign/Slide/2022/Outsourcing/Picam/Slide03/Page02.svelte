<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>CCTV</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 앱 등을 통해 반려인에게 지금 집의 <br/>
            &nbsp;&nbsp;디스플레이<br/>
            - 데모 버전에선 http 서버를 열어 해당 서버에<br/>
            &nbsp;&nbsp;접속하는 방색을 채용
        </p>
    </div>
</DefaultPage>