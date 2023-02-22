<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>IR 동작 검사</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 인스펙터에서만 수행<br/>
            - PCB에 IR LED를 켜 PCB의 동작을 검사<br/>
            - IR을 인식한 직후 매우 큰 전압 펄스가 1회 발생<br/>
            - 전압 펄스 발생 후 전압은 구형파를 형성
        </p>
    </div>
</DefaultPage>