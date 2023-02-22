<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>그래프 생성</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - JC를 노드, JC 사이의 연결 상태를 간선이라<br/>
            &nbsp;&nbsp;가정 후 그래프 생성
            {:else}
            - JC를 노드, JC 사이의 연결 상태를 간선이라 가정 후 그래프 생성
            {/if}
        </p>
    </div>
</DefaultPage>