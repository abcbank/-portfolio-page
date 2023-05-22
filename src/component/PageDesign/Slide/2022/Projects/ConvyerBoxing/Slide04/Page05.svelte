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
    <p>PLC</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 두가지 프로세스를 제어<br/>
            - IO 제어<br/>
            - 제품 컨베이어 제어<br/>
            - MELSEC 통신을 통해 PC와 통신<br/>
            - 사용 모델: 미스비시 Q001
        </p>
    </div>
</DefaultPage>
<style>
</style>