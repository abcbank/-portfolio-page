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
    <p>ToF Camera</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - ToF(Time of Flight) 카메라<br/>
            - 정면에 적외선을 발사하고, 발사한 적외선이 다시<br/>
            &nbsp;&nbsp;수신부에 들어오는 시간을 측정해 대상과<br/>
            &nbsp;&nbsp;카메라 사이의 거리를 측정<br/>
            - Arena SDk 및 Arena Studio 지원<br/>
            - 사용 모델: Helios2(HLT003S-001)
            {:else}
            - ToF(Time of Flight) 카메라<br/>
            - 정면에 적외선을 발사하고, 발사한 적외선이 다시 수신부에 들어오는 시간을<br/>
            &nbsp;&nbsp;측정해 대상과 카메라 사이의 거리를 측정<br/>
            - Arena SDk 및 Arena Studio 지원<br/>
            - 사용 모델: Helios2(HLT003S-001)
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>