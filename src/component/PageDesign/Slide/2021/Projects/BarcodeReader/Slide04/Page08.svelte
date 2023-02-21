<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>IO</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - IO 제어용 모듈<br/>
            - PCB를 통해 직접 만든 제품을 사용<br/>
            - 센서, 스위치 등 각 Input과 Output의<br/>
            &nbsp;&nbsp;상태를 PC에게 전달
            {:else}
            - IO 제어용 모듈<br/>
            - PCB를 통해 직접 만든 제품을 사용<br/>
            - 센서, 스위치 등 각 Input과 Output의 상태를 PC에게 전달
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>