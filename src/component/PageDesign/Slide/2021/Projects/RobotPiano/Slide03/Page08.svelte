<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <h3>곡의 분석 및 해석</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 각 block의 연주 가능 여부 판단<br/>
            &nbsp;&nbsp;1. 각 블럭의 가장 높은 음과 가장 낮은 음 추출<br/>
            &nbsp;&nbsp;2. 두 음의 차이를 비교<br/>
            &nbsp;&nbsp;3. 두 음이 1 옥타브 이상 차이날 경우, 해당<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;블럭은 연주 불가능<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- 이 경우, 가장 가까운 음을 대신 연주
            {:else}
            - 각 block의 연주 가능 여부 판단<br/>
            &nbsp;&nbsp;1. 각 블럭의 가장 높은 음과 가장 낮은 음 추출<br/>
            &nbsp;&nbsp;2. 두 음의 차이를 비교<br/>
            &nbsp;&nbsp;3. 두 음이 1 옥타브 이상 차이날 경우, 해당 블럭은 연주 불가능<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- 이 경우, 가장 가까운 음을 대신 연주
            {/if}
        </p>
    </div>
</DefaultPage>