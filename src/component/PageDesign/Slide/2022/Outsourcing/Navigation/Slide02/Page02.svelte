<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 목적</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 고속도로 안내 네비게이션 제작<br/>
            - python의 flask 서버 사용해 로컬 서버로 실행<br/>
            - C언어를 이용한 dijkstra 알고리즘으로 최단<br/>
            &nbsp;&nbsp;경로 계산
            {:else}
            - 고속도로 안내 네비게이션 제작<br/>
            - python의 flask 서버 사용해 로컬 서버로 실행<br/>
            - C언어를 이용한 dijkstra 알고리즘으로 최단 경로 계산
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>