<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>선루프의 이동</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 선루프의 이동은 모두 로봇팔을 사용해 수행<br/>
            - 여섯 위치 검사 기준 택타임은 30초
        </p>
    </div>
</DefaultPage>

<style>
    
</style>