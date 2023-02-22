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
            {#if $Device["isSmallScreen"]}
            - 이해도 부족에 의해 발생하는 문제는 이해도가<br/>
            &nbsp;&nbsp;높아지는 수밖에 없다고 판단<br/>
            - 퇴근 후 개인 시간에 추가 작업 진행
            {:else}
            - 이해도 부족에 의해 발생하는 문제는 이해도가 높아지면 수밖에 없다고 판단<br/>
            - 퇴근 후 개인 시간에 추가 작업 진행
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>