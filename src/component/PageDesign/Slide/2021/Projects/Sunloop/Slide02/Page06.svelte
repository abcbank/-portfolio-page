<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>수행 직무</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 검사 알고리즘 구상<br/>
            - C# 기반 검사용 프로그램 작성
        </p>
    </div>
</DefaultPage>

<style>
    
</style>