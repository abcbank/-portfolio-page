<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>그래프 생성</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - JC를 노드, JC 사이의 연결 상태를 간선이라<br/>
            &nbsp;&nbsp;가정 후 그래프 생성
            {:else}
            - JC를 노드, JC 사이의 연결 상태를 간선이라 가정 후 그래프 생성
            {/if}
        </p>
    </div>
</DefaultPage>