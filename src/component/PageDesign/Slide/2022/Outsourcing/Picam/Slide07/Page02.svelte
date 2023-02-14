<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트를 마치며</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 지인에게 부탁받아 진행한 첫번째 외주<br/>
            - 난이도가 엄청 높다 그런건 아니었지만, 데드라인이 많이 짧은 편이었음.<br/>
            - 사실상 웹 상에서 서버, 클라이언트를 처음으로 다뤄본 외주였음
        </p>
    </div>
</DefaultPage>
<style>
</style>