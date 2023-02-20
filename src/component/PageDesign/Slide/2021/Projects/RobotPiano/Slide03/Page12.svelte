<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <p>곡의 연주</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 별도의 두 개의 메인 쓰레드를 운영<br/>
            &nbsp;&nbsp;1. 높은음자리 연주 쓰레드<br/>
            &nbsp;&nbsp;2. 낮은음자리 연주 쓰레드
        </p>
    </div>
</DefaultPage>