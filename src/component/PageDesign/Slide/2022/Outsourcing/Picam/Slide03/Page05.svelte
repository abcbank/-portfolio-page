<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>반려동물 트래킹</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 반려동물이 카메라에 보였을 경우, 모터들을 사용해<br/>
            &nbsp;&nbsp;반려동물이 카메라에 제대로 나오도록 카메라 위치를<br/>
            &nbsp;&nbsp;조정

            {:else}
            - 반려동물이 카메라에 보였을 경우, 모터들을 사용해 반려동물이 카메라에<br/>
            &nbsp;&nbsp;제대로 나오도록 카메라 위치를 조정
            {/if}
        </p>
    </div>
</DefaultPage>