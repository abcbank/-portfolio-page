<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>Solution</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 실린더를 에어백이 내장된 실린더로 변경<br/>
            - 부딛히는 소리가 상당 부분 없어졌지만, 아예<br/>
            &nbsp;&nbsp;없어진 것은 아님.<br/>
            - Program Result 7페이지의 Normal 연주 데모 영상의<br/>
            &nbsp;&nbsp;경우, 실린더를 교체한 후 촬영한 영상임
            {:else}
            - 실린더를 에어백이 내장된 실린더로 변경<br/>
            - 부딛히는 소리가 상당 부분 없어졌지만, 아예 없어진 것은 아님.<br/>
            - Program Result 7페이지의 Normal 연주 데모 영상의 경우, 실린더를<br/>
            &nbsp;&nbsp;교체한 후 촬영한 영상임
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>