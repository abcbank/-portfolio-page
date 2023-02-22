<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>UI</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 사용자가 두 JC를 선택할 경우, 두 JC로<br/>
            &nbsp;&nbsp;이동하는 최단 경로를 표기<br/>
            - 선택된 JC가 없을 경우, 고속도로 연결 현황을 표기
            {:else}
            - 사용자가 두 JC를 선택할 경우, 두 JC로 이동하는 최단 경로를 표기<br/>
            - 선택된 JC가 없을 경우, 고속도로 연결 현황을 표기
            {/if}
        </p>
    </div>
</DefaultPage>