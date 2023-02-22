<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>비전을 통한 검사</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 동일한 제품에 대해 비전을 통한 검사 수행<br/>
            - 각 제품은 컨베이어를 통해 이동하며, 카메라는<br/>
            &nbsp;&nbsp;상단에서 이동하는 제품들을 촬영<br/>
            - PC는 촬영된 이미지를 알고리즘을 통해 정상적인<br/>
            &nbsp;&nbsp;제품인지 판단
            {:else}
            - 동일한 제품에 대해 비전을 통한 검사 수행<br/>
            - 각 제품은 컨베이어를 통해 이동하며, 카메라는 상단에서 이동하는 제품들을 촬영<br/>
            - PC는 촬영된 이미지를 알고리즘을 통해 정상적인 제품인지 판단
            {/if}
        </p>
    </div>
</DefaultPage>