<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>검사 종류</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 나사 구멍의 유무 검사<br/>
            - 형상 검사
        </p>
    </div>
</DefaultPage>

<style>
    
</style>