<script>
    import { Device, Color, season } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'
    import Icon from "../../../../Icon/Icon.svelte"
    import { onMount } from 'svelte'
    import { fade } from "svelte/transition"
    import { mdiArrowDownBoldOutline } from '@mdi/js';


    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={head}>
    <div class="context" style="color:{color};">
        <div class="header" style="width:100%; height:100%; font-size:{context}rem;">
            {#if $Device["isMobile"]}
                아래에서 현재 슬라이드와<br/>페이지를 확인할 수 있고,
            {:else}
                아래에서 현재 슬라이드와 페이지를 확인할 수 있고,
            {/if}
        </div>
        <div class="footer" style="width:100%; height:100px;" in:fade={{delay:200, duration:200,}}>
        <Icon size="60px" color={$Color["foreColor"][$season]} path={mdiArrowDownBoldOutline} />
        </div>
    </div>
</DefaultPage>


<style>
    .context{
        width:100%;
        height:100%;
        overflow: hidden; 
        white-space: nowrap;
    }
    .header{
		display: flex;
        text-align:center;
	    align-items: center;
		justify-content: center;
        width:100%;
        height:15%;
    }
    .footer{
        width:100%;
        position:absolute;
        bottom:0;
    }
</style>