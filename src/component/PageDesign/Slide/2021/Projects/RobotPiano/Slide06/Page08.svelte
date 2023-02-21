<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>실린더 소음</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 일반 실린더의 경우, 기압을 세게 넣어 동작할<br/>
            &nbsp;&nbsp;경우 소음이 크게 발생<br/>
            - 해당 소음으로 인해 연주 자체가 방해받는 경우가<br/>
            &nbsp;&nbsp;존재
            - Program Result 8페이지의 Snap 연주 데모 영상의<br/>
            &nbsp;&nbsp;경우, 실린더를 교체하기 전 촬영한 영상임
            {:else}
            - 일반 실린더의 경우, 기압을 세게 넣어 동작할<br/>
            &nbsp;&nbsp;경우 소음이 크게 발생<br/>
            - 해당 소음으로 인해 연주 자체가 방해받는 경우가 존재<br/>
            - Program Result 8페이지의 Snap 연주 데모 영상의 경우, 실린더를<br/>
            &nbsp;&nbsp;교체하기 전 촬영한 영상임
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>