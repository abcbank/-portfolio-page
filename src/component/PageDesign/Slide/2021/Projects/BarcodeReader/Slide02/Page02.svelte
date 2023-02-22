<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 목적</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 물류 업체에서 전달받은 프로젝트<br/>
            - 지정된 범위 내에서 바코드를 관측<br/>
            - 관측된 바코드를 사진 형태로 저장<br/>
            - 저장된 사진은 이후 송장을 통해 조회 가능<br/>
            - 결과적으로 원하는 것은 임의의 물건이<br/>
            &nbsp;&nbsp;오배송됐을때, 그 귀책 사유를 명확하게 하는 것
            {:else}
            - 물류 업체에서 전달받은 프로젝트<br/>
            - 지정된 범위 내에서 바코드를 관측<br/>
            - 관측된 바코드를 사진 형태로 저장<br/>
            - 저장된 사진은 이후 송장을 통해 조회 가능<br/>
            - 결과적으로 원하는 것은 임의의 물건이 오배송됐을때, 그 귀책 사유를 명확하게 하는 것
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>