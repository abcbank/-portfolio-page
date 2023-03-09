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
            &nbsp;&nbsp;&nbsp;&nbsp;
            - FloorInv: 천장 쓰레시홀드보다 더<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;낮은 영역 마스크<br/>
            7-1. 박스의 경우, 박스 전처리 시퀀스 수행<br/>
            7-2. 그 외의 경우, 비닐 전처리 시퀀스 수행
            {:else}
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
            &nbsp;&nbsp;&nbsp;&nbsp;
            - FloorInv: 천장 쓰레시홀드보다 더 낮은 영역 마스크<br/>
            7-1. 박스의 경우, 박스 전처리 시퀀스 수행<br/>
            7-2. 그 외의 경우, 비닐 전처리 시퀀스 수행
            {/if}
        </p>
    </div>
</DefaultPage>