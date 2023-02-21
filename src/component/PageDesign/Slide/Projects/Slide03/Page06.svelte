<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>PCB 업로드</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 다운로더에서만 수행<br/>
            - PCB에 지정된 펌웨어를 업로드
        </p>
    </div>
</DefaultPage>