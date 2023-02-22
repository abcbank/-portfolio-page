<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>비전 검사</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 일부 불량 제품의 경우, 지정된 위치에 체결용<br/>
            &nbsp;&nbsp;나사 구멍이 뚫려있지 않음<br/>
            - 이를 확인 후 불량 사실을 인지하기 위한<br/>
            &nbsp;&nbsp;비전 프로세스
            {:else}
            - 일부 불량 제품의 경우, 지정된 위치에 체결용 나사 구멍이 뚫려있지 않음<br/>
            - 이를 확인 후 불량 사실을 인지하기 위한 비전 프로세스
            {/if}
        </p>
    </div>
</DefaultPage>