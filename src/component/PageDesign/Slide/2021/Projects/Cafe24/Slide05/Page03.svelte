<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 한계</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 아무것도 모르는 상태에서 들이박으니<br/>
            &nbsp;&nbsp;매우매우 홈페이지 html이 더러워짐....
            {:else}
            - 아무것도 모르는 상태에서 들이박으니<br/>
            &nbsp;&nbsp;매우매우 홈페이지 html이 더러워짐....
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>