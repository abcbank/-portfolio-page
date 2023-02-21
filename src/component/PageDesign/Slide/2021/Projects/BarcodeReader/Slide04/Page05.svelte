<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let subhead = 1.5;
    export let context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Keyence Camera</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 실질적으로 바코드를 읽고, 탐색하는<br/>
            &nbsp;&nbsp;디바이스<br/>
            - PC와 이더넷을 통해 통신하며, 커멘드<br/>
            &nbsp;&nbsp;제어 방식을 활용<br/>
            - PC의 제어에 따라 발견된 바코드와<br/>
            &nbsp;&nbsp;바코드의 좌표 등을 PC에게 제공<br/>
            - 사용 모델: SR1000
            {:else}
            - 실질적으로 바코드를 읽고, 탐색하는 디바이스<br/>
            - PC와 이더넷을 통해 통신하며, 커멘드 제어 방식을 활용<br/>
            - PC의 제어에 따라 발견된 바코드와 바코드의 좌표 등을<br/>
            &nbsp;&nbsp;PC에게 제공<br/>
            - 사용 모델: SR1000
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>