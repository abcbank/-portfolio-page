<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>자료형</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - C 계열 위주로 사용해 적응 기간이 필요했음<br/>
            - 불특정한 자료형을 컨트롤한다는 것이 가장 어색했다
        </p>
    </div>
</DefaultPage>
<style>
</style>