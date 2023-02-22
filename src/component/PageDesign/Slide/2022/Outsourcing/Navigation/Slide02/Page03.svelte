<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>수행 직무</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - Python 기반 Flask 서버 제작<br/>
            - Dijkstra 알고리즘 수행용 dll 파일 제작<br/>
            - cpython을 통해 flask 서버에서 dll 파일 실행<br/>
            - 웹 크롤링을 통해 고속도로의 jc 크롤링<br/>
            - 카카오맵 api를 사용해 지도 표시<br/>
            - 지도에 jc 사이의 연결 상태 및 이동 경로 등 표시
        </p>
    </div>
</DefaultPage>

<style>
    
</style>