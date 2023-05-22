<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>스위치에 의한 오동작</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 전원 스위치의 허용 전력 이상의 값을 사용해<br/>
            &nbsp;&nbsp;기구의 오동작 발생<br/>
            - 전원을 끈 후 정상적으로 꺼지지 않는 문제 발생<br/>
            - 전원을 켠 직후 부저가 울리는 현상 발생
            {:else}
            - 전원 스위치의 허용 전력 이상의 값을 사용해 기구의 오동작 발생<br/>
            - 전원을 끈 후 정상적으로 꺼지지 않는 문제 발생<br/>
            - 전원을 켠 직후 부저가 울리는 현상 발생
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>