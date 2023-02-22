<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let subhead = 1.5;
    export let context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>IO</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - PC와 시리얼로 통신하며 I/O를 제어<br/>
            - Input<br/>
            &nbsp;&nbsp;- Start Switch: 시작 스위치<br/>
            &nbsp;&nbsp;- Box Sensor: 박스 존재 여부 감지 센서<br/>
            &nbsp;&nbsp;- Hand Sensor: 장비 내부의 손 감지 센서<br/>
            - Output<br/>
            &nbsp;&nbsp;- Cylinder 1: 박스 이동 실린더<br/>
            &nbsp;&nbsp;- Cylinder 2: 카메라 이동 실린더<br/>
            - PCB를 직접 떠서 사용
            {:else}
            - PC와 시리얼로 통신하며 I/O를 제어<br/>
            - Input<br/>
            &nbsp;&nbsp;- Start Switch: 시작 스위치<br/>
            &nbsp;&nbsp;- Box Sensor: 박스 존재 여부 감지 센서<br/>
            &nbsp;&nbsp;- Hand Sensor: 장비 내부의 손 감지 센서<br/>
            - Output<br/>
            &nbsp;&nbsp;- Cylinder 1: 박스 이동 실린더<br/>
            &nbsp;&nbsp;- Cylinder 2: 카메라 이동 실린더<br/>
            - PCB를 직접 떠서 사용
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>