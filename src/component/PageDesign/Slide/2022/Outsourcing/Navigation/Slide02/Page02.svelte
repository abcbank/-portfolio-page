<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>프로젝트 목적</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
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