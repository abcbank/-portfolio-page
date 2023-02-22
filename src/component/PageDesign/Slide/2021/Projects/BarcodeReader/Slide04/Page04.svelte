<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const subhead = 1.5;
    export const context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>PC</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 대부분의 연산은 키엔스 카메라측에서 해주므로<br/>
            &nbsp;&nbsp;고사양의 PC는 필요 없다 판단<br/>
            - 적당한 조립 PC 사용<br/>
            - CPU: i5<br/>
            - RAM: 8GB
            {:else}
            - 대부분의 연산은 키엔스 카메라측에서 해주므로 고사양의 PC는 필요 없다 판단<br/>
            - 적당한 조립 PC 사용<br/>
            - CPU: i5<br/>
            - RAM: 8GB
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>