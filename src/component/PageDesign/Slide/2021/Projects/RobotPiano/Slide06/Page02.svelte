<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>실린더 반응 속도</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 실린더는 기본적으로 기압이 차야 반응하는<br/>
            &nbsp;&nbsp;구조<br/>
            - 따라서 IO의 상태를 변경하자마자 실린더가<br/>
            &nbsp;&nbsp;반응해 건반을 치는 것은 불가능<br/>
            - 이에 따라 건반을 누를때와 건반에서 땔 때<br/>
            &nbsp;&nbsp;모두 약간의 딜레이 타임을 요구<br/>
            - 일부 정말 짧게 쳐야하는 음의 경우, 아예<br/>
            &nbsp;&nbsp;연주가 생략될 수 있음.<br/>
            - 동일한 이유로, bpm이 빠른 곡은 아예 연주가<br/>
            &nbsp;&nbsp;불가능<br/>
            {:else}
            - 실린더는 기본적으로 기압이 차야 반응하는 구조<br/>
            - 따라서 IO의 상태를 변경하자마자 실린더가 반응해 건반을 치는<br/>
            &nbsp;&nbsp;것은 불가능<br/>
            - 이에 따라 건반을 누를때와 건반에서 땔 때 모두 약간의 딜레이<br/>
            &nbsp;&nbsp;타임을 요구<br/>
            - 일부 정말 짧게 쳐야하는 음의 경우, 아예 연주가 생략될 수 있음.<br/>
            - 동일한 이유로, bpm이 빠른 곡은 아예 연주가 불가능
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>