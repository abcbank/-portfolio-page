<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <h3>곡 제어의 유동성 추가</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - Pause / Continue / Stop 기능 추가<br/>
            - 플레이 리스트 기준 현재 곡과 다음 곡을<br/>
            &nbsp;&nbsp;재생하는 버튼 추가
            {:else}
            - Pause / Continue / Stop 기능 추가<br/>
            - 플레이 리스트 기준 현재 곡과 다음 곡을 재생하는 버튼 추가
            {/if}
        </p>
    </div>
</DefaultPage>