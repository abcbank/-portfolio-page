<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>옥타브 내림에 의한 음정 부조화</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 낮은음자리 음표들은 안전거리 확보를<br/>
            &nbsp;&nbsp;위해 기본적으로 1옥타브 내려서 연주<br/>
            - 일부 곡의 경우, 이렇게 옥타브를 내린<br/>
            &nbsp;&nbsp;것이 치명적이게 작용
            {:else}
            - 낮은음자리 음표들은 안전거리 확보를 위해 기본적으로 1옥타브<br/>
            &nbsp;&nbsp;내려서 연주<br/>
            - 일부 곡의 경우, 이렇게 옥타브를 내린 것이 치명적이게 작용
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>