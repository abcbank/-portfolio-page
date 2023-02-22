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
    <p>SPI</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 펌웨어 업로드용 통신 모듈<br/>
            - 기존 업로드에 사용하던 프로그램을 그대로<br/>
            &nbsp;&nbsp;실행<br/>
            - 사용  모델: Cheetah SPI
            {:else}
            - 펌웨어 업로드용 통신 모듈<br/>
            - 기존 업로드에 사용하던 프로그램을 그대로 실행<br/>
            - 사용  모델: Cheetah SPI
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>