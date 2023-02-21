<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Dijkstra</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 사용자가 두 점을 지정할 경우, dll 파일로 그래프<br/>
            &nbsp;&nbsp;및 시작점, 끝점을 전달<br/>
            - 리턴으로 두 점 사이의 최단거리 및 경로를 리턴<br/>
            - 예상 시간의 경우 80km/h를 기준으로 연산 수행
            {:else}
            - 사용자가 두 점을 지정할 경우, dll 파일로 그래프 및 시작점, 끝점을 전달<br/>
            - 리턴으로 두 점 사이의 최단거리 및 경로를 리턴<br/>
            - 예상 시간의 경우 80km/h를 기준으로 연산 수행
            {/if}
        </p>
    </div>
</DefaultPage>