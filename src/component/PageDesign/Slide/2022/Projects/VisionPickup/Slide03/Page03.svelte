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
            {/if}
        </p>
    </div>
</DefaultPage>