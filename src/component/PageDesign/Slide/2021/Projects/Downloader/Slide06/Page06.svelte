<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>펌웨어 업로드</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 원래는 Cheetah SPI SDK를 통해 업로드용<br/>
            &nbsp;&nbsp;라이브러리를 만들 생각이었음.<br/>
            - 다만, 업로드 후 정상적으로 동작하는지<br/>
            &nbsp;&nbsp;확인할 방법이 없었음<br/>
            {:else}
            - 원래는 Cheetah SPI SDK를 통해 업로드용 라이브러리를 만들 생각이었음.<br/>
            - 다만, 업로드 후 정상적으로 동작하는지 확인할 방법이 없었음<br/>
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>