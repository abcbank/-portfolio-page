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
    <h3>PC</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 주요 제어기 역할<br/>
            - 비전 검사는 Vision Pro를 사용해 진행<br/>
            - Convyer Vision과 동일한 모델 사용<br/>
            - 사용 모델: 사내 컴퓨터<br/>
            &nbsp;&nbsp;- CPU: Ryzen7-5800 <br/>
            &nbsp;&nbsp;- GPU: GTX 1050 Ti<br/>
            &nbsp;&nbsp;- RAM: 16GB
            {:else}
            - 주요 제어기 역할<br/>
            - 비전 검사는 Vision Pro를 사용해 진행<br/>
            - Convyer Vision과 동일한 모델 사용<br/>
            - 사용 모델: 사내 컴퓨터<br/>
            &nbsp;&nbsp;- CPU: Ryzen7-5800 <br/>
            &nbsp;&nbsp;- GPU: GTX 1050 Ti<br/>
            &nbsp;&nbsp;- RAM: 16GB
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>