<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>프로젝트를 마치며</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 첫 프로젝트이자, 가장 아쉬움이 많았던<br/>
            &nbsp;&nbsp;프로젝트라 생각함<br/>
            - 이후에도 항상 한번쯤 리뉴얼하고싶다,라는<br/>
            &nbsp;&nbsp;생각을 많이 했었음<br/>
            - 운좋게도, 나중에 2022년에 유사한 기능의<br/>
            &nbsp;&nbsp;장비를 한번 더 만들 기회가 있었음
            {:else}
            - 첫 프로젝트이자, 가장 아쉬움이 많았던 프로젝트라 생각함<br/>
            - 이후에도 항상 한번쯤 리뉴얼하고싶다,라는 생각을 많이 했었음<br/>
            - 운좋게도, 나중에 2022년에 유사한 기능의 장비를 한번 더 만들 기회가 있었음
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>