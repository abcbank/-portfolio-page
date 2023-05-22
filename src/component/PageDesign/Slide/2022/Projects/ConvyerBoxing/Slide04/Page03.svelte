<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Box Convyer</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 상자 로딩용 컨베이어 박스<br/>
            - 뒤에서 상자가 하나씩 로딩되며, 이를 하나씩<br/>
            &nbsp;&nbsp;취출할 구조물 설계 후 부착<br/>
            - On/Off 버튼을 통해 제어
            {:else}
            - 상자 로딩용 컨베이어 박스<br/>
            - 뒤에서 상자가 하나씩 로딩되며, 이를 하나씩 취출할 구조물 설계 후 부착<br/>
            - On/Off 버튼을 통해 제어
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>