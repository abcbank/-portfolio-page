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
            {#if $Device["isSmallScreen"]}
            - 고정 IP가 아니라 현재 연결된 와이파이 IP<br/>
            &nbsp;&nbsp;기준으로 서버를 엶<br/>
            - 라우팅용 공유기 설정 후 시연시 해당 공유기를<br/>
            &nbsp;&nbsp;통해 서버를 접속
            {:else}
            - 고정 IP가 아니라 현재 연결된 와이파이 IP 기준으로 서버를 엶<br/>
            - 라우팅용 공유기 설정 후 시연시 해당 공유기를 통해 서버를 접속
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>