<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 한계</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 계약 후 진행했던 프로젝트라 팔 수는 있었으나...<br/>
            - 무수히 많은 버그, 오류 등등 문제가 많았음
        </p>
    </div>
</DefaultPage>
<style>
</style>