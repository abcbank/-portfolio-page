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
    <p>Camera</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 이미지를 가져올 카메라<br/>
            - 바슬러 카메라를 사용<br/>
            - PC측에서 이미지를 요청할 경우, GIGE를<br/>
            &nbsp;&nbsp;통해 PC에 이미지를 전달<br/>
            - 사용  모델: a2A1920-51gmBAS<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            (Basler ace 2 Basic)<br/>

            - 펌웨어 업로드용 통신 모듈<br/>
            - 기존 업로드에 사용하던 프로그램을 그대로<br/>
            &nbsp;&nbsp;실행<br/>
            - 사용  모델: Cheetah SPI
            {:else}
            - 이미지를 가져올 카메라<br/>
            - 바슬러 카메라를 사용<br/>
            - PC측에서 이미지를 요청할 경우, GIGE를 통해 PC에 이미지를 전달<br/>
            - 사용  모델: a2A1920-51gmBAS(Basler ace 2 Basic)
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>