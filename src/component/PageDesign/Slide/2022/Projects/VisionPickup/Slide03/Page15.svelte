<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>단일 그랩 프로세스</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 낮은 레이어에서부터 연산을 시작하며, 상자가<br/>
            &nbsp;&nbsp;발견되면 그 즉시 알고리즘 중단
            - 여러개의 상자가 발견되어도 가장 높은 위치에<br/>
            &nbsp;&nbsp;존재하는 상자 하나만 선택한 후 픽업
            - 모든 레이어에 대해 상자가 없다고 판단될 경우,<br/>
            &nbsp;&nbsp;현재 ROI에는 상자가 없다고 결론을<br/>
            &nbsp;&nbsp;내리고 프로세스 종료
            - 상대적으로 작업속도가 느리고, 촬영을 많이<br/>
            &nbsp;&nbsp;수행함.
            {:else}
            - 낮은 레이어에서부터 연산을 시작하며, 상자가 발견되면 그 즉시 알고리즘 중단
            - 여러개의 상자가 발견되어도 가장 높은 위치에 존재하는 상자 하나만 선택한 후<br/>
            &nbsp;&nbsp;픽업
            - 모든 레이어에 대해 상자가 없다고 판단될 경우, 현재 ROI에는 상자가 없다고<br/>
            &nbsp;&nbsp;결론을 내리고 프로세스 종료
            - 상대적으로 작업속도가 느리고, 촬영을 많이 수행함.
            {/if}
        </p>
    </div>
</DefaultPage>