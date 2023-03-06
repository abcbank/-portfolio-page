<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 한계</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 실질적으로 판매하지 못해 여러모로 아쉬운<br/>
            &nbsp;&nbsp;프로젝트<br/>
            - 앞서 말했지만, 강약 조절만 성공하면 가치가<br/>
            &nbsp;&nbsp;높을듯?
        </p>
    </div>
</DefaultPage>
<style>
</style>