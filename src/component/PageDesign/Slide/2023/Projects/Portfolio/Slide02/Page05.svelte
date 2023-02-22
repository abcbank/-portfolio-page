<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>수행 직무</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - C# 기반 PC 프로그램<br/>
            - C 기반 IO 펌웨어 프로그램<br/>
            - IO-PC 통신 프로토콜 설정
        </p>
    </div>
</DefaultPage>

<style>
    
</style>