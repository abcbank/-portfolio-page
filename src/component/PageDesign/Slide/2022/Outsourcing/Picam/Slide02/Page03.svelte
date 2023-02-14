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
            - 일부 주요 기능들을 시연할 수 있도록 설계<br/>
            - 장비에 내장될 파이썬 기반 스크립트 작성
        </p>
    </div>
</DefaultPage>

<style>
    
</style>