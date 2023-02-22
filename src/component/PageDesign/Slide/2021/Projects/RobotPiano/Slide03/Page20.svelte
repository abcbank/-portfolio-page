<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <p>영상 / 음원 재생 기능</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - bpm 등 다양한 제약 사항으로 인해 로봇<br/>
            &nbsp;&nbsp;피아노의 단독 연주는 힘들다 판단<br/>
            - 따라서 배경음악 / 영상을 재생하고, 피아노가<br/>
            &nbsp;&nbsp;이에 대해 반주를 치는 방식으로 일부 곡 연주
            {:else}
            - bpm 등 다양한 제약 사항으로 인해 로봇 피아노의 단독 연주는<br/>
            &nbsp;&nbsp;힘들다 판단<br/>
            - 따라서 배경음악 / 영상을 재생하고, 피아노가 이에 대해 반주를<br/>
            &nbsp;&nbsp;치는 방식으로 일부 곡 연주
            {/if}
        </p>
    </div>
</DefaultPage>