<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>JC 정보 수집</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 의뢰인의 강력한 주장에 따라 웹크롤링 사용<br/>
            &nbsp;&nbsp;(필자는 웹크롤링을 별로 안좋아함)<br/>
            - 위키피디아에서 각 JC의 이름과 연결된<br/>
            &nbsp;&nbsp;고속도로 명을 크롤링
        </p>
    </div>
</DefaultPage>