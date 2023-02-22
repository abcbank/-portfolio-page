<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>HTML 수정</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - Mark Down을 제외한 마크업 언어를<br/>
            &nbsp;&nbsp;처음으로 사용<br/>
            - 일반적인 프로그래밍 언어와 개념이 달라<br/>
            &nbsp;&nbsp;이해가 안되는 부분이 상당수 존재<br/>
            - html에 대한 이해도가 낮은 상태에서 작업을<br/>
            &nbsp;&nbsp;시작해 작업 속도 자체가 더뎠음
            {:else}
            - Mark Down을 제외한 마크업 언어를 처음으로 사용<br/>
            - 일반적인 프로그래밍 언어와 개념이 달라 이해가 안되는 부분이 상당수 존재<br/>
            - html에 대한 이해도가 낮은 상태에서 작업을 시작해 작업 속도 자체가 더뎠음
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>