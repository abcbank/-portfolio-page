<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>박스 컨베이어 프로세스</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            1. 박스의 유무 확인<br/>
            2. 박스가 있을 경우, 하나만 취출<br/>
            &nbsp;&nbsp;- 박스 컨베이어 로딩 완료
            3. 제품 컨베이어 프로세스 대기<br/>
            4. 제품이 들어간 박스를 취출<br/><br/>
            - 지정된 시간 이상으로 박스가 로딩되지 않을<br/>
            &nbsp;&nbsp;경우, 부저를 울려 사용자에게 이상을 알림
            {:else}
            1. 박스의 유무 확인<br/>
            2. 박스가 있을 경우, 하나만 취출<br/>
            3. 제품 컨베이어 프로세스 대기<br/>
            4. 제품이 들어간 박스를 취출<br/><br/>
            - 지정된 시간 이상으로 박스가 로딩되지 않을 경우, 부저를 울려 사용자에게 이상을 알림
            {/if}
        </p>
    </div>
</DefaultPage>