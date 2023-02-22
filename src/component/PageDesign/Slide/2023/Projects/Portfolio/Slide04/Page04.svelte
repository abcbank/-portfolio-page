<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>PC</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - C# 기반 프로그램을 사용<br/>
            - 다른 모듈과 통신<br/>
            - 전반적인 시퀀스 및 동작 제어
        </p>
    </div>
</DefaultPage>
<style>
</style>