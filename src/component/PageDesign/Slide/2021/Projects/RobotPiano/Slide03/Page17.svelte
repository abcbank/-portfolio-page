<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <p>Snap 연주 - 메인 쓰레드</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 메인 쓰레드 프로세스<br/>
            &nbsp;&nbsp;1. 시작 직후 시간 기록<br/>
            &nbsp;&nbsp;2. 시간의 경과 여부 확인<br/>
            &nbsp;&nbsp;3. 음의 시작 시간을 지났고, 로봇이 이동중이지<br/>
            &nbsp;&nbsp;않을 경우 음 연주 쓰레드 생성<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- 이동중일 경우, 이동 완료 대기<br/>
            &nbsp;&nbsp;4. 2~3을 곡의 연주가 끝날때까지 반복<br/>
            &nbsp;&nbsp;5. 곡의 연주가 완료된 후 로봇 위치를<br/>
            &nbsp;&nbsp;기본 위치로 이동
            {:else}
            - 메인 쓰레드 프로세스<br/>
            &nbsp;&nbsp;1. 시작 직후 시간 기록<br/>
            &nbsp;&nbsp;2. 시간의 경과 여부 확인<br/>
            &nbsp;&nbsp;3. 음의 시작 시간을 지났고, 로봇이 이동중이지 않을 경우 음 연주<br/>
            &nbsp;&nbsp;쓰레드 생성<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- 이동중일 경우, 이동 완료 대기<br/>
            &nbsp;&nbsp;4. 2~3을 곡의 연주가 끝날때까지 반복<br/>
            &nbsp;&nbsp;5. 곡의 연주가 완료된 후 로봇 위치를 기본 위치로 이동
            {/if}
        </p>
    </div>
</DefaultPage>