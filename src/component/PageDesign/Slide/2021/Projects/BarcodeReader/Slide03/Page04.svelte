<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>바코드 탐색</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 동일한 바코드가 서로 다른 사진에서 여러번<br/>
            &nbsp;&nbsp;출력될 가능성이 있음<br/>
            - 따라서 동일한 바코드를 배제하는 알고리즘이 필요<br/>
            - 각 바코드의 중심 좌표를 구한 후, 각 중심이<br/>
            &nbsp;&nbsp;일정 거리 이상 가까운 바코드가 바코드 값까지<br/>
            &nbsp;&nbsp;동일할 경우, 같은 바코드로 판단
            {:else}
            - 동일한 바코드가 서로 다른 사진에서 여러번 출력될 가능성이 있음<br/>
            - 따라서 동일한 바코드를 배제하는 알고리즘이 필요<br/>
            - 각 바코드의 중심 좌표를 구한 후, 각 중심이 일정 거리 이상 가까운<br/>
            &nbsp;&nbsp;바코드가 바코드 값까지 동일할 경우, 같은 바코드로 판단
            {/if}
        </p>
    </div>
</DefaultPage>