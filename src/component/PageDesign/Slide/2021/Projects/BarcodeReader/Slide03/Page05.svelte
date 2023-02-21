<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>탐색 프로세스</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            1. 사용자가 물건을 담아 박스에 배치<br/>
            2. 시작 버튼을 누름<br/>
            3. 박스가 실린더를 통해 내부로 이동<br/>
            4. 내부에서 촬영 및 바코드 탐색 진행<br/>
            5. 탐색된 바코드의 개수와 실제 바코드의 개수를<br/>
            &nbsp;&nbsp;비교. 일치할 경우, 8로 이동<br/>
            6. 탐색된 바코드의 개수가 실제 바코드의 개수가<br/>
            &nbsp;&nbsp;일치하지 않을 경우, 카메라를 상단으로 이동한<br/>
            &nbsp;&nbsp;후 촬영 및 바코드 탐색 재수행<br/>
            7. 탐색된 바코드의 개수와 실제 바코드의 개수를<br/>
            &nbsp;&nbsp;다시 비교. 일치할 경우 8, 일치하지 않을 경우<br/>
            &nbsp;&nbsp;9으로 이동<br/>
            8. 일치할 경우, PASS<br/>
            9. 일치하지 않을 경우, FAIL
            {:else}
            1. 사용자가 물건을 담아 박스에 배치<br/>
            2. 시작 버튼을 누름<br/>
            3. 박스가 실린더를 통해 내부로 이동<br/>
            4. 내부에서 촬영 및 바코드 탐색 진행<br/>
            5. 탐색된 바코드의 개수와 실제 바코드의 개수를 비교. 일치할 경우, 8로 이동<br/>
            6. 탐색된 바코드의 개수가 실제 바코드의 개수가 일치하지 않을 경우, 카메라를<br/>
            &nbsp;&nbsp;상단으로 이동한 후 촬영 및 바코드 탐색 재수행<br/>
            7. 탐색된 바코드의 개수와 실제 바코드의 개수를 다시 비교. 일치할 경우 8,<br/>
            &nbsp;&nbsp;일치하지 않을 경우 9으로 이동<br/>
            8. 일치할 경우, PASS<br/>
            9. 일치하지 않을 경우, FAIL
            {/if}
        </p>
    </div>
</DefaultPage>