<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>수행 직무</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 바코드 탐색을 위핸 C# 제어 프로그램 제작
        </p>
    </div>
</DefaultPage>

<style>
    
</style>