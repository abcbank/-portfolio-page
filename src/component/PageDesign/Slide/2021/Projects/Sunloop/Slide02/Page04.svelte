<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>선루프의 이동</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 선루프의 이동은 모두 로봇팔을 사용해 수행<br/>
            - 여섯 위치 검사 기준 택타임은 30초
            {:else}
            - 선루프의 이동은 모두 로봇팔을 사용해 수행<br/>
            - 여섯 위치 검사 기준 택타임은 30초
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>