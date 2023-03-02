<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <p>플레이 리스트 기능</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 여러 곡을 꼬리 물며 재생하는 플레이 리스트<br/>
            &nbsp;&nbsp;기능 추가
            {:else}
            - 여러 곡을 꼬리 물며 재생하는 플레이 리스트 기능 추가
            {/if}
        </p>
    </div>
</DefaultPage>