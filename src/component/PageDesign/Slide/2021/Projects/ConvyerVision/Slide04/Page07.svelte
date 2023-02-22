<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>PC</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 주요 제어기 역할<br/>
            - 각종 센서를 통해 카메라의 ROI에 물체가<br/>
            &nbsp;&nbsp;있는지 확인하고, 물체가 있을 경우<br/>
            &nbsp;&nbsp;촬영 및 검사 진행<br/>
            - 비전 검사는 Vision Pro를 사용해 진행<br/>
            - 사용 모델: 사내 컴퓨터<br/>
            &nbsp;&nbsp;- CPU: Ryzen7-5800br/>
            &nbsp;&nbsp;- GPU: GTX 1050 Ti<br/>
            &nbsp;&nbsp;- RAM: 16GB
            {:else}
            - 주요 제어기 역할<br/>
            - 각종 센서를 통해 카메라의 ROI에 물체가 있는지 확인하고, 물체가 있을 경우<br/>
            &nbsp;&nbsp;촬영 및 검사 진행<br/>
            - 비전 검사는 Vision Pro를 사용해 진행<br/>
            - 사용 모델: 사내 컴퓨터<br/>
            &nbsp;&nbsp;- CPU: Ryzen7-5800br/>
            &nbsp;&nbsp;- GPU: GTX 1050 Ti<br/>
            &nbsp;&nbsp;- RAM: 16GB
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>