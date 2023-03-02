<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>IO</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - PCB를 직접 떠서 사용<br/>
            - 실린더와 릴레이 등, 물리적인<br/>
            &nbsp;&nbsp;움직임을제어(Output)<br/>
            - 적외선 센서와 스위치 등, 입력값을<br/>
            &nbsp;&nbsp;전달(Input)<br/>
            - PC와 시리얼 통신을 통해 명령을 전달받고,<br/>
            &nbsp;&nbsp;입력값들을 전달
            {:else}
            - PCB를 직접 떠서 사용<br/>
            - 실린더와 릴레이 등, 물리적인 움직임을 제어(Output)<br/>
            - 적외선 센서와 스위치 등, 입력값을 전달(Input)<br/>
            - PC와 시리얼 통신을 통해 명령을 전달받고, 입력값들을 전달
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>