<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <p>Normal 연주</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 총 두 개의 메인 쓰레드를 사용<br/>
            &nbsp;&nbsp;1. 높은음 연주 쓰레드<br/>
            &nbsp;&nbsp;2. 낮은음 연주 쓰레드<br/>
            - 실린더가 내려가는 힘을 이용해 건반을 때림<br/>
            - 건반을 때리는 힘이 상당히 강한 편임<br/>
            - Snap 모드에 비해 딱딱한 느낌이 강하나, 더 빠른<br/>
            &nbsp;&nbsp;곡을 연주 가능함.
            {:else}
            - 총 두 개의 메인 쓰레드를 사용<br/>
            &nbsp;&nbsp;1. 높은음 연주 쓰레드<br/>
            &nbsp;&nbsp;2. 낮은음 연주 쓰레드<br/>
            - 실린더가 내려가는 힘을 이용해 건반을 때림<br/>
            - 건반을 때리는 힘이 상당히 강한 편임<br/>
            - Snap 모드에 비해 딱딱한 느낌이 강하나, 더 빠른 곡을 연주 가능함.
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
    div{
        height:100%;
        width:100%; 
		flex: 1 0 auto;
	    align-items: center;
		justify-content: center;
		display: flex;
		text-align: center;
    }
</style>