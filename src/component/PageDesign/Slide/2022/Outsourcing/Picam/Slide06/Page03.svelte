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
            - 카카오 맵 api를 통해 위치를 가져오는 과정에서,<br/>
            &nbsp;&nbsp;제대로 검색 결과가 나오지 않는 JC는 문제가<br/>
            &nbsp;&nbsp;있는 JC라고 판단<br/>
            - 위치를 확신할 수 있는 JC에 대해서만 알고리즘<br/>
            &nbsp;&nbsp;수행
            {:else}
            - 카카오 맵 api를 통해 위치를 가져오는 과정에서, 제대로 검색 결과가<br/>
            &nbsp;&nbsp;나오지 않는 JC는 문제가 있는 JC라고 판단<br/>
            - 위치를 확신할 수 있는 JC에 대해서만 알고리즘 수행
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>