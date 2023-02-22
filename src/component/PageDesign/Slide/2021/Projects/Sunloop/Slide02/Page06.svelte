<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>수행 직무</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 검사 알고리즘 구상<br/>
            - C# 기반 검사용 프로그램 작성
        </p>
    </div>
</DefaultPage>

<style>
    
</style>