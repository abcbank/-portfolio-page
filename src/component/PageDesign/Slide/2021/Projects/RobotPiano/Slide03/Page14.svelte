<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2
    
    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>곡의 연주</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 음 연주 쓰레드 프로세스<br/>
            &nbsp;&nbsp;1. 서스테인 처리<br/>
            &nbsp;&nbsp;2. 지정된 음에 해당되는 실린더 내림<br/>
            &nbsp;&nbsp;3. 음의 길이만큼 대기<br/>
            &nbsp;&nbsp;4. 지정된 음에 해당되는 실린더 올림<br/>
            &nbsp;&nbsp;5. 해당 음이 block의 마지막일 경우, 로봇팔의<br/>
            &nbsp;&nbsp;위치를 다음 block의 위치로 이동
            {:else}
            - 음 연주 쓰레드 프로세스<br/>
            &nbsp;&nbsp;1. 서스테인 처리<br/>
            &nbsp;&nbsp;2. 지정된 음에 해당되는 실린더 내림<br/>
            &nbsp;&nbsp;3. 음의 길이만큼 대기<br/>
            &nbsp;&nbsp;4. 지정된 음에 해당되는 실린더 올림<br/>
            &nbsp;&nbsp;5. 해당 음이 block의 마지막일 경우, 로봇팔의 위치를 다음 block의<br/>
            &nbsp;&nbsp;위치로 이동
            {/if}
        </p>
    </div>
</DefaultPage>