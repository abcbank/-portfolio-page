<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 목적</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 대학 1학년 수준 과제 대행<br/>
            - Python으로 외부 모듈을 불러와 계산기 제작<br/>
        </p>
    </div>
</DefaultPage>

<style>
    
</style>