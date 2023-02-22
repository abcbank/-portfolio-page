<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <h3>플레이 리스트 기능</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 여러 곡을 꼬리 물며 재생하는 플레이 리스트<br/>
            &nbsp;&nbsp;기능 추가
            {:else}
            - 여러 곡을 꼬리 물며 재생하는 플레이 리스트 기능 추가
            {/if}
        </p>
    </div>
</DefaultPage>