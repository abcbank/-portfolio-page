<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <p>Snap 연주</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 총 두 개의 메인 쓰레드를 사용<br/>
            &nbsp;&nbsp;1. 높은음 연주 쓰레드<br/>
            &nbsp;&nbsp;2. 낮은음 연주 쓰레드<br/>
            - 로봇팔이 내려가는 힘을 이용해 건반을 때림<br/>
            - 건반을 때리는 힘이 상대적으로 약한 편임<br/>
            - 전체적으로 Normal 모드에 비해 부드러우나,<br/>
            &nbsp;&nbsp;연음 연주를 못하고 로봇팔의 이동시간을<br/>
            &nbsp;&nbsp;추가로 소모해 느린 곡만 연주 가능
            {:else}
            - 총 두 개의 메인 쓰레드를 사용<br/>
            &nbsp;&nbsp;1. 높은음 연주 쓰레드<br/>
            &nbsp;&nbsp;2. 낮은음 연주 쓰레드<br/>
            - 로봇팔이 내려가는 힘을 이용해 건반을 때림<br/>
            - 건반을 때리는 힘이 상대적으로 약한 편임<br/>
            - 전체적으로 Normal 모드에 비해 부드러우나, 연음 연주를 못하고<br/>
            &nbsp;&nbsp;로봇팔의 이동시간을추가로 소모해 느린 곡만 연주 가능
            {/if}
        </p>
    </div>
</DefaultPage>