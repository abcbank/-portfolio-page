<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>제품 별 설정</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 의뢰주의 각 제품에 대한 옵션을 선택할수 있도록<br/>
            &nbsp;&nbsp;설정<br/>
            - 각 제품은 각기 다른 설정 파일을 가짐
        </p>
    </div>
</DefaultPage>