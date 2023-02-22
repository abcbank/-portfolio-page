<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>프로젝트 한계</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 실질적으로 판매하지 못해 여러모로 아쉬운 프로젝트<br/>
            - 앞서 말했지만, 강약 조절만 성공하면 가치가 높을듯?
        </p>
    </div>
</DefaultPage>
<style>
</style>