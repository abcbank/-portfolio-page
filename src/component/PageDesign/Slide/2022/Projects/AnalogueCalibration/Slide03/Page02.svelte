<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>차광도 표기</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 상단에서 광케이블을 통해 빛을 내고, 하단에 위치한 포토센서로 빛이 차단된 정도 측정
            - 흑유리가 빛을 차광시키는 정도와 현재 차광된 정도를 비교해 현재 용접면의 기능을 흑유리의 차광도와 비교
            {:else}
            - 동일한 제품에 대해 비전을 통한 검사 수행<br/>
            - 각 제품은 컨베이어를 통해 이동하며, 카메라는 상단에서 이동하는 제품들을 촬영<br/>
            - PC는 촬영된 이미지를 알고리즘을 통해 정상적인 제품인지 판단
            {/if}
        </p>
    </div>
</DefaultPage>