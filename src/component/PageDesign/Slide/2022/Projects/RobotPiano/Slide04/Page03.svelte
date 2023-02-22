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
    <h3>Camera</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 이미지를 가져올 카메라<br/>
            - 사내에 있던 바슬러 카메라를 사용<br/>
            - PC측에서 이미지를 요청할 경우, GIGE를<br/>
            &nbsp;&nbsp;통해 PC에 이미지를 전달<br/>
            - 사용 모델: acA2440-20gm<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            (Basler ace)
            {:else}
            - 이미지를 가져올 카메라<br/>
            - 사내에 있던 바슬러 카메라를 사용<br/>
            - PC측에서 이미지를 요청할 경우, GIGE를 통해 PC에 이미지를 전달<br/>
            - 사용 모델: acA2440-20gm(Basler ace)
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>