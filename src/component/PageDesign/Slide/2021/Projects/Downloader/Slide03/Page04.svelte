<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>잔류 전류 검사</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 다운로더 / 인스펙터에서 모두 수행<br/>
            - PCB에 전원을 끈 직후 전류값을 측정
        </p>
    </div>
</DefaultPage>