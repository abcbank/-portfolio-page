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
            - 실제 불량과 번짐으로 인한 오차를 구분할<br/>
            &nbsp;&nbsp;정도만 해결하면 된다고 판단<br/>
            - 노출 시간을 조정해 번짐 현상을 최소화<br/>
            - 스트로브를 통해 해결할 수도 있으나, 사용한<br/>
            &nbsp;&nbsp;광원 컨트롤러가 스트로브 기능을<br/>
            &nbsp;&nbsp;지원하지 않음
            {:else}
            - 실제 불량과 번짐으로 인한 오차를 구분할 정도만 해결하면 된다고 판단<br/>
            - 노출 시간을 조정해 번짐 현상을 최소화<br/>
            - 스트로브를 통해 해결할 수도 있으나, 사용한 광원 컨트롤러가 스트로브<br/>
            &nbsp;&nbsp;기능을 지원하지 않음
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>