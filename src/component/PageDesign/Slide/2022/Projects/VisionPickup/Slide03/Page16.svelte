<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>연속 그랩 프로세스</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 그랩을 시작하기 전, 모든 레이어에 대해 알고리즘<br/>
            &nbsp;&nbsp;수행<br/>
            - 탐색된 모든 상자를 높이 순으로 픽업한 후 재촬영<br/>
            &nbsp;&nbsp;진행<br/>
            - 상자가 없다고 판단될 경우, 현재 ROI에는 상자가<br/>
            &nbsp;&nbsp;없다고 결론을 내리고 프로세스 종료<br/>
            - 상대적으로 모든 상자를 이동시키는 속도는 빠르나,<br/>
            &nbsp;&nbsp;알고리즘 연산에 상대적으로 많은 시간이 필요함.
            {:else}
            - 그랩을 시작하기 전, 모든 레이어에 대해 알고리즘 수행<br/>
            - 탐색된 모든 상자를 높이 순으로 픽업한 후 재촬영 진행<br/>
            - 상자가 없다고 판단될 경우, 현재 ROI에는 상자가 없다고 결론을 내리고<br/>
            &nbsp;&nbsp;프로세스 종료<br/>
            - 상대적으로 모든 상자를 이동시키는 속도는 빠르나, 알고리즘 연산에<br/>
            &nbsp;&nbsp;상대적으로 많은 시간이 필요함.
            {/if}
        </p>
    </div>
</DefaultPage>