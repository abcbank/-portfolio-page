<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>잔류 전류 검사</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 다운로더 / 인스펙터에서 모두 수행<br/>
            - PCB에 전원을 끈 직후 전류값을 측정
        </p>
    </div>
</DefaultPage>