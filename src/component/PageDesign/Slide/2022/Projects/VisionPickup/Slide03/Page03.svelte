<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>전처리 알고리즘</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            1. 옵션에 따라, 신규 이미지 요청 혹은 마지막<br/>
            &nbsp;&nbsp;이미지에 대하여 수행<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- RawData: 가공되지 않은 데이터<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;그대로 저장<br/>
            1. 전체 이미지 중 ROI 영역만 자름<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- RawMat: RawData를 Mat형태로 가공<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- ROI: RawMat 중 ROI 영역을 clone<br/>
            2. ROI 영역에 대하여, ROIXMat, ROIYMat, zMat 데이터로 분리<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- ROIXMat: ROI의 X좌표 데이터<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- ROIYMat: ROI의 Y좌표 데이터<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- zMat: ROI의 Z좌표 데이터<br/>
            3. ROIXMat와 ROIYMat에 대하여, 음과 양이 바뀌는<br/>
            &nbsp;&nbsp;부분 탐색. 해당 라인이 곧 카메라의 주점<br/>
            &nbsp;&nbsp;영역이라 판단<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;- OriginMask: 주점 마스크<br/>
            4. zMat에 대해, 유효하지 않은 영역(빛이 다시<br/>
            &nbsp;&nbsp;반사되어 돌아오지 않은 영역)과 유효한 영역<br/>
            &nbsp;&nbsp;(빛이 반사되어 돌아온 영역) 분리<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - ValidMask: 유효 영역 마스크<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - InvalidMask: 유효하지 않은 영역<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;마스크<br/>
            5. 유효하지 않은 영역의 zMat에 주변 픽셀의 평균값 대입<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - zMat에 그대로 대입<br/>
            6.  가우시안 블러 수행<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - BlurMat: zMat에서 가우시안 블러를<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;수행한 데이터<br/>
            7. 천장 쓰레시홀드보다 더 높은 값을 가진<br/>
            &nbsp;&nbsp;값을 분리<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - Floor: 천장 쓰레시홀드보다 더 높은<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;영역 마스크<br/>
            - FloorInv: 천장 쓰레시홀드보다 더<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;낮은 영역 마스크<br/>
            7-1. 박스의 경우, 박스 전처리 시퀀스 수행<br/>
            7-2. 그 외의 경우, 비닐 전처리 시퀀스 수행
            {:else}
            1. 옵션에 따라, 신규 이미지 요청 혹은 마지막 이미지에 대하여 수행<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - RawData: 가공되지 않은 데이터 그대로 저장<br/>
            1. 전체 이미지 중 ROI 영역만 자름<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - RawMat: RawData를 Mat형태로 가공<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - ROI: RawMat 중 ROI 영역을 clone<br/>
            2. ROI 영역에 대하여, ROIXMat, ROIYMat, zMat 데이터로 분리<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - ROIXMat: ROI의 X좌표 데이터<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - ROIYMat: ROI의 Y좌표 데이터<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - zMat: ROI의 Z좌표 데이터<br/>
            3. ROIXMat와 ROIYMat에 대하여, 음과 양이 바뀌는 부분 탐색. 해당 라인이 곧 카메라의 주점<br/>
            &nbsp;&nbsp;영역이라 판단<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - OriginMask: 주점 마스크<br/>
            4. zMat에 대해, 유효하지 않은 영역(빛이 다시 반사되어 돌아오지 않은 영역)과 유효한 영역<br/>
            &nbsp;&nbsp;(빛이 반사되어 돌아온 영역) 분리<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - ValidMask: 유효 영역 마스크<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - InvalidMask: 유효하지 않은 영역 마스크<br/>
            5. 유효하지 않은 영역의 zMat에 주변 픽셀의 평균값 대입<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - zMat에 그대로 대입<br/>
            6.  가우시안 블러 수행<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - BlurMat: zMat에서 가우시안 블러를 수행한 데이터<br/>
            7. 천장 쓰레시홀드보다 더 높은 값을 가진 값을 분리<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            - Floor: 천장 쓰레시홀드보다 더 높은 영역 마스크<br/>
            - FloorInv: 천장 쓰레시홀드보다 더 낮은 영역 마스크<br/>
            7-1. 박스의 경우, 박스 전처리 시퀀스 수행<br/>
            7-2. 그 외의 경우, 비닐 전처리 시퀀스 수행
            {/if}
        </p>
    </div>
</DefaultPage>