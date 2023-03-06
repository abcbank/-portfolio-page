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
        - 아무래도 급하게 UI를 수정하다보니 약간 야매로<br/>
            &nbsp;&nbsp;넘어간 부분이 없잖아 있음
        </p>
    </div>
</DefaultPage>
<style>
</style>