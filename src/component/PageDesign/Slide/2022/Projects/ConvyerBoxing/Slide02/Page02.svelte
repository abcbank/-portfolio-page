<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 목적</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 사람이 택배 포장로 배송할 제품들을 가져다 두면<br/>
            &nbsp;&nbsp;이를 자동으로 박스에 넣어주는 시스템 개발<br/><br/>
            - 총 두 개의 컨베이어 밸트를 구동<br/>
            - 하나는 박스를 이동 / 하나는 제품을 이동<br/>
            - 컨베이어 밸트 위에 각 상자에 들어갈 제품들을<br/>
            &nbsp;&nbsp;배치 / 컨베이어 벨트가 이동하며 실린더 등을<br/>
            &nbsp;&nbsp;통해 해당 제품들을 상자에 패킹
            {:else}
            - 사람이 택배 포장로 배송할 제품들을 가져다 두면 이를 자동으로 박스에 넣어주는 시스템 개발<br/><br/>
            - 총 두 개의 컨베이어 밸트를 구동<br/>
            - 하나는 박스를 이동 / 하나는 제품을 이동<br/>
            - 컨베이어 밸트 위에 각 상자에 들어갈 제품들을 배치 / 컨베이어 벨트가 이동하며 실린더 등을<br/>
            &nbsp;&nbsp;통해 해당 제품들을 상자에 패킹
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>