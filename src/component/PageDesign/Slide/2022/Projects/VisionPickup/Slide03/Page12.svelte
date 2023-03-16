<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>하드웨어 세팅</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 카메라의 정보(좌표계 1)를 통해 로봇팔의<br/>
            &nbsp;&nbsp;좌표(좌표계 2)를 특정할 수 있도록 하드웨어 세팅<br/>
            - 하드웨어를 정밀하게 세팅하거나, 컨볼루전을<br/>
            &nbsp;&nbsp;통해 좌표계 변환하는 것이 일반적임<br/>
            - 현재 상황에선 그냥 정밀하게 세팅하는 편이 더<br/>
            &nbsp;&nbsp;빠르게 구현되므로 하드웨어 세팅을 진행<br/>
            - 카메라를 촬영하는 위치에서 버큠만 하단으로 향하게<br/>
            &nbsp;&nbsp;한 후, Z축 좌표만 변경해 원점 설정<br/>
            - 원점을 기준으로 X, Y, Z축 기준 횡이동이 큰 오차<br/>
            &nbsp;&nbsp;없이 일직선으로 이동할 수 있도록 Rx, Ry,<br/>
            &nbsp;&nbsp;Rz 좌표 미세조정
            {:else}
            - 카메라의 정보(좌표계 1)를 통해 로봇팔의 좌표(좌표계 2)를 특정할 수 있도록<br/>
            &nbsp;&nbsp;하드웨어 세팅<br/>
            - 하드웨어를 정밀하게 세팅하거나, 컨볼루전을 통해 좌표계 변환하는 것이 일반적임<br/>
            - 현재 상황에선 그냥 정밀하게 세팅하는 편이 더 빠르게 구현되므로 하드웨어 세팅을<br/>
            &nbsp;&nbsp;진행<br/>
            - 카메라를 촬영하는 위치에서 버큠만 하단으로 향하게 한 후, Z축 좌표만 변경해<br/>
            &nbsp;&nbsp;원점 설정<br/>
            - 원점을 기준으로 X, Y, Z축 기준 횡이동이 큰 오차 없 일직선으로 이동할 수<br/>
            &nbsp;&nbsp;있도록 Rx, Ry, Rz 좌표 미세조정
            {/if}
        </p>
    </div>
</DefaultPage>