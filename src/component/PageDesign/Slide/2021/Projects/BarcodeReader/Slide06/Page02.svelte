<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>곡선 바코드에 대한 처리</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 핸드 크림과 같이 바코드가 곡면에 위치한 경우,<br/>
            &nbsp;&nbsp;제대로 읽을 수 없는 문제 발생<br/>
            - 특히, 곡면의 물체는 박스의 이동 과정에서 이동할<br/>
            &nbsp;&nbsp;가능성이 높고, 그에 의해 일부 바코드가 가려지는<br/>
            &nbsp;&nbsp;문제 발생
            {:else}
            - 핸드 크림과 같이 바코드가 곡면에 위치한 경우, 제대로 읽을 수 없는 문제 발생<br/>
            - 특히, 곡면의 물체는 박스의 이동 과정에서 이동할 가능성이 높고, 그에 의해 일부<br/>
            &nbsp;&nbsp;바코드가 가려지는 문제 발생
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>