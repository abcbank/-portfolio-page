<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>언더바 홈페이지 리뉴얼</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            1. 전체적인 디자인 컨셉 변경<br/>
            2. 디자이너의 의도에 따라 색상 등 세부 사항 변경<br/>
        </p>
    </div>
</DefaultPage>

<style>
    
</style>