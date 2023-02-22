<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <p>곡의 분석 및 해석</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - midi 음원에서 음과 쉼표의 시작 시간, 음의<br/>
            &nbsp;&nbsp;길이, 옥타브, 계이름 등 주요 데이터 추출<br/>
            - 추출된 데이터는 배열 형태로 메모리에 저장<br/>
            - 일정 길이 이상의 쉼표가 있을때,<br/>
            &nbsp;&nbsp;로봇팔의 위치를 이동 가능하다 판단<br/>
            - 해당 길이의 쉼표를 기준으로 멜로디를 분할<br/>
            &nbsp;&nbsp;- 이때, 각 분할된 멜로디들을 block이라 명명
            {:else}
            - midi 음원에서 음과 쉼표의 시작 시간, 음의 길이, 옥타브, 계이름 등<br/>
            &nbsp;&nbsp;주요 데이터 추출<br/>
            - 추출된 데이터는 배열 형태로 메모리에 저장<br/>
            - 일정 길이 이상의 쉼표가 있을때, 로봇팔의 위치를 이동 가능하다 판단<br/>
            - 해당 길이의 쉼표를 기준으로 멜로디를 분할<br/>
            &nbsp;&nbsp;- 이때, 각 분할된 멜로디들을 block이라 명명
            {/if}
        </p>
    </div>
</DefaultPage>