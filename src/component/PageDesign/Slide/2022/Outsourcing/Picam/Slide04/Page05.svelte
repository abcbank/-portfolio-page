<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>C dll</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 서버에서 참조하는 라이브러리 파일<br/>
            - 그래프 및 시작점과 끝점을 전달받고, 다익스트라<br/>
            &nbsp;&nbsp;알고리즘을 통해 최단 경로 및 거리를 찾아 리턴
            {:else}
            - 서버에서 참조하는 라이브러리 파일<br/>
            - 그래프 및 시작점과 끝점을 전달받고, 다익스트라 알고리즘을 통해 최단 경로 및<br/>
            &nbsp;&nbsp;거리를 찾아 리턴
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>