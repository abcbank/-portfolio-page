<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>로봇 핸드</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 핸드는 총 두가지 사항을 결정함<br/>
            &nbsp;&nbsp;1. 건반의 연주 방식<br/>
            &nbsp;&nbsp;2. 한 위치에서 연주할 수 있는 건반의 개수<br/>
            - 건반은 실린더를 통해 연주하도록 설정<br/>
            - 실린더가 내려가며 건반을 때리며 소리를 냄<br/>
            - 하나의 위치에선 최대 한 옥타브에 해당되는<br/>
            &nbsp;&nbsp;건반을 칠 수 있도록 핸드 구상<br/>
            - 즉, 1옥타브 도에 핸드가 위치할 경우, 1옥타브<br/>
            &nbsp;&nbsp;도에서 2옥타브 도까지 소리를 연주 가능
            {:else}
            - 핸드는 총 두가지 사항을 결정함<br/>
            &nbsp;&nbsp;1. 건반의 연주 방식<br/>
            &nbsp;&nbsp;2. 한 위치에서 연주할 수 있는 건반의 개수<br/>
            - 건반은 실린더를 통해 연주하도록 설정<br/>
            - 실린더가 내려가며 건반을 때리며 소리를 냄<br/>
            - 하나의 위치에선 최대 한 옥타브에 해당되는 건반을 칠 수 있도록<br/>
            &nbsp;&nbsp;핸드 구상<br/>
            - 즉, 1옥타브 도에 핸드가 위치할 경우, 1옥타브 도에서 2옥타브<br/>
            &nbsp;&nbsp;도까지 소리를 연주 가능
            {/if}
        </p>
    </div>
</DefaultPage>