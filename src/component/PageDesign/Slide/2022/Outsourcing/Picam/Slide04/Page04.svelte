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
    <p>Raspberry Pi</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 데모 제품의 컨트롤러 역할<br/>
            - 파이 카메라에서 이미지를 받아와 이를 서버에 업로드<br/>
            - 각종 기능 실행 트리거를 읽어 기능을 실제 수행
            {:else}
            - 데모 제품의 컨트롤러 역할<br/>
            - 파이 카메라에서 이미지를 받아와 이를 서버에 업로드<br/>
            - 각종 기능 실행 트리거를 읽어 기능을 실제 수행
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>