<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>상자 그랩</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            1. 주점으로 이동<br/>
            2. 주점에서 도출된 결과의 X,Y 좌표를 더해 결과<br/>
            &nbsp;&nbsp;위치로 이동<br/>
            3. 2의 위치에서 Z 좌표만큼 이동해 상자와 버큠이<br/>
            &nbsp;&nbsp;닿도록 설정<br/>
            4. 버큠 On<br/>
            5. 3의 위치로 이동<br/>
            6. 현재 위치의 1축 값이 -30 이하일 경우, 현재<br/>
            &nbsp;&nbsp;좌표에서 1축의 값을 -30으로 설정<br/>
            7. 최종 위치로 이동<br/>
            8. 버큠 Off<br/>
            9. 일정 시간 대기<br/>
            10. 주점으로 이동<br/>
            11. 촬용이 필요할 경우 촬영 위치로 이동
            {:else}
            1. 주점으로 이동<br/>
            2. 주점에서 도출된 결과의 X,Y 좌표를 더해 결과 위치로 이동<br/>
            3. 2의 위치에서 Z 좌표만큼 이동해 상자와 버큠이 닿도록 설정<br/>
            4. 버큠 On<br/>
            5. 3의 위치로 이동<br/>
            6. 현재 위치의 1축 값이 -30 이하일 경우, 현재 좌표에서 1축의 값을 -30으로 설정<br/>
            7. 최종 위치로 이동<br/>
            8. 버큠 Off<br/>
            9. 일정 시간 대기<br/>
            10. 주점으로 이동<br/>
            11. 촬용이 필요할 경우 촬영 위치로 이동
            {/if}
        </p>
    </div>
</DefaultPage>