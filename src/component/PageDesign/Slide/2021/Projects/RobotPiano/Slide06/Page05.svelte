<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

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
            - block 분할 전, 연음 체크를 먼저 수행<br/>
            - 확인된 연음은 모두 플래그를 세워둠<br/>
            - block 분할 알고리즘에서, 해당 플래그를 확인해<br/>
            &nbsp;&nbsp;연음이 포함될 경우 이를 고려한 알고리즘 수행<br/>
            {:else}
            - block 분할 전, 연음 체크를 먼저 수행<br/>
            - 확인된 연음은 모두 플래그를 세워둠<br/>
            - block 분할 알고리즘에서, 해당 플래그를 확인해 연음이 포함될 경우 이를 고려한<br/>
            &nbsp;&nbsp;알고리즘 수행<br/>
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>