<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>제품 컨베이어 프로세스</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            1. 제품의 유무 확인<br/>
            2. 제품이 있을 경우, 박스 컨베이어의 로딩<br/>
            &nbsp;&nbsp;대기<br/>
            3. 박스 컨베이어의 로딩 완료 후, 제품을<br/>
            &nbsp;&nbsp;박스에 넣음<br/><br/>
            - 지정된 시간 이상으로 제품이 로딩되지 않을<br/>
            &nbsp;&nbsp;경우, 부저를 울려 사용자에게 이상을 알림
            {:else}
            1. 제품의 유무 확인<br/>
            2. 제품이 있을 경우, 박스 컨베이어의 로딩 대기<br/>
            3. 박스 컨베이어의 로딩 완료 후, 제품을 박스에 넣음<br/><br/>
            - 지정된 시간 이상으로 제품이 로딩되지 않을 경우, 부저를 울려 사용자에게 이상을 알림
            {/if}
        </p>
    </div>
</DefaultPage>