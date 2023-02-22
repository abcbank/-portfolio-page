<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Solution</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 감정을 어느정도 넣기 위해 별도의 Snap 연주<br/>
            &nbsp;&nbsp;모드 추가<br/>
            - 보완하기 위해선 건반을 누르는 방식 자체를<br/>
            &nbsp;&nbsp;서보 모터 등을 바꿔야 할 것으로 추정<br/>
            - 다만, 하드웨어적인 개편이 필요한 경우, 비용으로<br/>
            &nbsp;&nbsp;인해 실질적으로 해보진 않음<br/>
            - 무엇보다 가성비 있게 감정을 넣는 방식에 대한<br/>
            &nbsp;&nbsp;연구가 필요<br/>
            - 이후 개선 방향에만 추가해둔 상태임
            {:else}
            - 감정을 어느정도 넣기 위해 별도의 Snap 연주 모드 추가<br/>
            - 보완하기 위해선 건반을 누르는 방식 자체를 서보 모터 등을 바꿔야<br/>
            &nbsp;&nbsp;할 것으로 추정<br/>
            - 다만, 하드웨어적인 개편이 필요한 경우, 비용으로 인해 실질적으로<br/>
            &nbsp;&nbsp;해보진 않음<br/>
            - 무엇보다 가성비 있게 감정을 넣는 방식에 대한 연구가 필요<br/>
            - 이후 개선 방향에만 추가해둔 상태임
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>