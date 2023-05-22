<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>모니터링 프로그램</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - PLC를 통해 컨베이어의 상황을 파악하고 동작을<br/>
            &nbsp;&nbsp;제어하는만큼, 문제가 발생했을 경우 이를<br/>
            &nbsp;&nbsp;해결하기 쉽지 않겠다는 판단 하에 제작<br/>
            - PLC의 상태를 모니터링하고, 현재 상태를<br/>
            &nbsp;&nbsp;사용자에게 알려줄 프로그램 제작<br/>
            - 각 프로세스의 현재 상태 확인<br/>
            - PLC의 각 접점의 현재 상태 확인<br/>
            - 박스가 로딩되지 않은 시간을 표기<br/>
            - 제품이 로딩되지 않은 시간을 표기<br/>
            - 일부 접점을 제어
            {:else}
            - PLC를 통해 컨베이어의 상황을 파악하고 동작을 제어하는만큼, 문제가 발생했을 경우 이를<br/>
            &nbsp;&nbsp;해결하기 쉽지 않겠다는 판단 하에 제작<br/>
            - PLC의 상태를 모니터링하고, 현재 상태를 사용자에게 알려줄 프로그램 제작<br/>
            - 각 프로세스의 현재 상태 확인<br/>
            - PLC의 각 접점의 현재 상태 확인<br/>
            - 박스가 로딩되지 않은 시간을 표기<br/>
            - 제품이 로딩되지 않은 시간을 표기<br/>
            - 일부 접점을 제어
            {/if}
        </p>
    </div>
</DefaultPage>