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
    <p>Flask</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - HTML 호스팅 서버<br/>
            - 대학 과제 수준이므로 로컬 호스트 사용<br/>
            - JC의 선택 여부 등을 http 통신으로 받아 이에<br/>
            &nbsp;&nbsp;대한 처리를 진행
            {:else}
            - HTML 호스팅 서버<br/>
            - 대학 과제 수준이므로 로컬 호스트 사용<br/>
            - JC의 선택 여부 등을 http 통신으로 받아 이에 대한 처리를 진행
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>