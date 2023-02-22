<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>곡의 분석 및 해석</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 음원은 midi 파일을 사용<br/>
            &nbsp;&nbsp;- 음악 자체를 디지털화해 연산 수행
            {:else}
            - 음원은 midi 파일을 사용<br/>
            &nbsp;&nbsp;- 음악 자체를 디지털화해 연산 수행<br/>
            {/if}
        </p>
    </div>
</DefaultPage>