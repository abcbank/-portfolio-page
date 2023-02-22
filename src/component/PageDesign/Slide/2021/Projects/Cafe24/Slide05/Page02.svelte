<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트를 마치며</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 마크다운만 쓰던 내가 html을 처음으로<br/>
            &nbsp;&nbsp;다뤄본 프로젝트<br/>
            - 뷰, 리엑트, 스벨트 등의 존재를 알게<br/>
            &nbsp;&nbsp;되면서 제일 현타가 왔던 프로젝트임<br/>
            - 나름 유익했던 것은 인정하나 두번 하라고 하면<br/>
            &nbsp;&nbsp;절대 못할 프로젝트임<br/>
            - 주변 지인들이 대체 왜 쌩 html을 수정하고<br/>
            &nbsp;&nbsp;앉아있냐고 항상 뭐라 했음
            {:else}
            - 마크다운만 쓰던 내가 html을 처음으로 다뤄본 프로젝트<br/>
            - 뷰, 리엑트, 스벨트 등의 존재를 알게 되면서 제일 현타가 왔던 프로젝트임<br/>
            - 나름 유익했던 것은 인정하나 두번 하라고 하면 절대 못할 프로젝트임<br/>
            - 주변 지인들이 대체 왜 쌩 html을 수정하고 앉아있냐고 항상 뭐라 했음
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>