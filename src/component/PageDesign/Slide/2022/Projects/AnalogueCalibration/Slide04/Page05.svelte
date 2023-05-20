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
    <p>Light Source</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 상단 지그에서 빛을 비춰주는 광원<br/>
            - 할로겐 램프 사용<br/>
            - 의뢰주가 요청한 모델을 사용했으나, 이름이<br/>
            &nbsp;&nbsp;기억 안남<br/>
            - 사용 모델: ???
            {:else}
            - 상단 지그에서 빛을 비춰주는 광원<br/>
            - 할로겐 램프 사용<br/>
            - 의뢰주가 요청한 모델을 사용했으나, 이름이<br/>
            &nbsp;&nbsp;기억 안남<br/>
            - 사용 모델: ???
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>