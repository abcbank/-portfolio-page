<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>건반 누름</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 누르기 자체는 난이도가 높지 않음<br/>
            - 각 건반의 위치를 로봇의 좌표로 학습<br/>
            - 특정 건반을 눌러야 할 경우, 로봇 팔의<br/>
            &nbsp;&nbsp;위치를 확인<br/>
            - 현재 위치에서 칠 수 없다고 판단될 경우,<br/>
            &nbsp;&nbsp;위치를 이동<br/>
            - 현재 위치에서 칠 수 있다고 판단될 경우,<br/>
            &nbsp;&nbsp;해당 건반을 누름<br/>
            - 건반을 누르고 지정된 시간이 지난 후, 건반을<br/>
            &nbsp;&nbsp;다시 올림
            {:else}
            - 누르기 자체는 난이도가 높지 않음<br/>
            - 각 건반의 위치를 로봇의 좌표로 학습<br/>
            - 특정 건반을 눌러야 할 경우, 로봇 팔의 위치를 확인<br/>
            - 현재 위치에서 칠 수 없다고 판단될 경우, 위치를 이동<br/>
            - 현재 위치에서 칠 수 있다고 판단될 경우, 해당 건반을 누름<br/>
            - 건반을 누르고 지정된 시간이 지난 후, 건반을 다시 올림
            {/if}
        </p>
    </div>
</DefaultPage>