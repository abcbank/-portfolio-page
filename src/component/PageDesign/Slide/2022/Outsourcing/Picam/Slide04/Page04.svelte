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
    <p>Lens</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 카메라에 부착할 렌즈<br/>
            - 사내에 있던 렌즈를 사용<br/>
            - 사용 모델: C11-1620-12M-P f16mm<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            (Basler Lens)
            {:else}
            - 카메라에 부착할 렌즈<br/>
            - 사내에 있던 렌즈를 사용<br/>
            - 사용 모델: C11-1620-12M-P f16mm (Basler Lens)
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>