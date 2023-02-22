<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <p>곡의 분석 및 해석</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - block을 통해 각 로봇팔의 부딛힘 여부 판단<br/>
            &nbsp;&nbsp;1. 각 블럭의 기준 위치(제일 낮은 음) 추출<br/>
            &nbsp;&nbsp;2. 10ms 단위로 멜로디를 시뮬레이팅하며, 두<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;로봇팔의 기준 위치 확인<br/>
            &nbsp;&nbsp;3. 두 로봇팔의 기준 위치가 1.3옥타브 이하로<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;차이날 경우, 부딛힐 가능성이 있으므로 곡의<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;연주 제한
            {:else}
            - block을 통해 각 로봇팔의 부딛힘 여부 판단<br/>
            &nbsp;&nbsp;1. 각 블럭의 기준 위치(제일 낮은 음) 추출<br/>
            &nbsp;&nbsp;2. 10ms 단위로 멜로디를 시뮬레이팅하며, 두 로봇팔의 기준 위치 확인<br/>
            &nbsp;&nbsp;3. 두 로봇팔의 기준 위치가 1.3옥타브 이하로 차이날 경우,<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;부딛힐 가능성이 있으므로 곡의 연주 제한
            {/if}
        </p>
    </div>
</DefaultPage>