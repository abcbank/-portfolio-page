<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 목적</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 물류 센터에서 제품를 쏟으면 상자를 찾아 버큠을<br/>
            &nbsp;&nbsp;사용해 잡고 이동<br/>
            - 사실상 로봇팔 등을 사용해 상자에 제품을 넣는<br/>
            &nbsp;&nbsp;패키징 작업을 자동화하는 것이 목적
            {:else}
            - 물류 센터에서 제품를 쏟으면 상자를 찾아 버큠을 사용해 잡고 이동<br/>
            - 사실상 로봇팔 등을 사용해 상자에 제품을 넣는 패키징 작업을 자동화하는<br/>
            &nbsp;&nbsp;것이 목적
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>