<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'


    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>수행 직무</p>
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