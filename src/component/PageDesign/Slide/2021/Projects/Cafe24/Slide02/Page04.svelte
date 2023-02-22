<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>수행 직무</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - HTML 페이지 수정
        </p>
    </div>
</DefaultPage>

<style>
    
</style>