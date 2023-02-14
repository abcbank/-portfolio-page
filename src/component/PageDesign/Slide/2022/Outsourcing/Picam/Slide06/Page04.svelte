<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>핫스팟 IP 주소의 유동성</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 기존엔 핫스팟을 통해 와이파이 연결을 진행하려고 했음<br/>
            - 핫스팟은 특정 상황에서 IP 주소가 새로 갱신되는 문제 발생<br/>
            - 서버를 여는 과정에서 IP 주소와 포트가 필요함<br/>
            - IP 주소가 갱신되며 입력된 IP 주소와 실제 IP 주소가 달라 발생하는 현상<br/>
        </p>
    </div>
</DefaultPage>
<style>
</style>