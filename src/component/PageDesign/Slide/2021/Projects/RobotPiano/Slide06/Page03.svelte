<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Solution</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 하드웨어의 한계에 의한 결점이므로 해당 경우를<br/>
            &nbsp;&nbsp;줄이는게 최선이라 판단.<br/>
            - bpm이 빠른 곡은 아예 연주 대상에서 제외<br/>
            - 정말 빨리 쳐야되는 일부 음의 경우, 곡 편집<br/>
            &nbsp;&nbsp;과정에서 최대한 삭제
            {:else}
            - 하드웨어의 한계에 의한 결점이므로 해당 경우를 줄이는게 최선이라 판단.<br/>
            - bpm이 빠른 곡은 아예 연주 대상에서 제외<br/>
            - 정말 빨리 쳐야되는 일부 음의 경우, 곡 편집 과정에서 최대한 삭제
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>