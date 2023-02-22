<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>펄스 측정</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - USBScope 102는 최대 10V까지 측정 가능<br/>
            - IR 동작 검사에서 측정해야하는 전압은 50V
        </p>
    </div>
</DefaultPage>
<style>
</style>