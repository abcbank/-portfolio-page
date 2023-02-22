<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>Solution</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 외주사에서 제공해준 기존 사용하던<br/>
            &nbsp;&nbsp;콘솔 프로그램을 실행<br/>
            - 콘솔 프로그램의 출력을 읽어 업로드의<br/>
            &nbsp;&nbsp;성공 / 실패 여부를 판별
            {:else}
            - 외주사에서 제공해준 기존 사용하던 콘솔 프로그램을 실행<br/>
            - 콘솔 프로그램의 출력을 읽어 업로드의 성공 / 실패 여부를 판별
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>