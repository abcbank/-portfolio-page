<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>장비 검사 프로세스</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            1. 로봇팔을 통해 선루프를 검사 위치로 도입<br/>
            2. 카메라 촬영 후 비전 검사 수행<br/>
            3. 1~2를 검사 장소의 수만큼 반복
        </p>
    </div>
</DefaultPage>

<style>
    
</style>