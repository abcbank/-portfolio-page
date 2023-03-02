<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
    console.log($Device["isSmallScreen"])
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>수행 직무</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 라즈베리파이에 올라갈 파이썬 스크립트 작성
        </p>
    </div>
</DefaultPage>

<style>
    
</style>