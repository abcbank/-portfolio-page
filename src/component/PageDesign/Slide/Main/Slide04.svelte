<script>
    import { Tooltip } from 'sveltestrap'
    import { Color, season } from "../../../../global"
    import DefaultSlide from '../defaultSlide.svelte'
    import Icon from "../../../Icon/Icon.svelte"
    import { onMount } from 'svelte'
    import { fade } from "svelte/transition"
    import { mdiCursorDefaultClick } from '@mdi/js';
    import IconButton from "../../../Dropdown/IconButton.svelte"
    export let color;

    let animationStart = false;
    let visibility = true;
    let t;

    function startAnimationTimer(){
        clearTimeout(t);
        visibility = true;
        t = setTimeout(() => {
            animationStart = true;
            animationFinished();
        }, 2000)
    }
    function animationFinished(){
        clearTimeout(t);
        t = setTimeout(() => {
            restartAnimation();
        }, 2500)
    }
    function restartAnimation(){
        visibility = false;
        animationStart = false;
        clearTimeout(t);
        t = setTimeout(() => {
            startAnimationTimer();
        }, 1500)
    }
    onMount(() => {
        startAnimationTimer();
    })
</script>

<DefaultSlide>
    <div class="context" style="color:{color};">
        <div class="Section" style="height:100%; width:100%;">
            <div class="header" style="height:20%;">
                물론, 이전 페이지도 볼 수 있겠죠?
            </div>
            <div class="howToMove" sytle="margin-left:-1.5rem;">
                {#if visibility}
                <div class='animation' style="left: {!animationStart ? 25 : 75}%;"  in:fade={{duration:200}} out:fade={{duration:200}}>
                    <Icon size="3rem" color={$Color["foreColor"][$season]} path={mdiCursorDefaultClick} />
                </div>
                {/if}
            </div>
        </div>
    </div>
</DefaultSlide>

<style>
    .context{
        width:100%;
        height:100%;
        overflow: hidden; 
        white-space: nowrap;
    }
    .Section{
		display: flex;
        text-align:center;
	    align-items: center;
		justify-content: center;
        flex-direction:column;
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
    .howToMove{
        position:relative;
        font-size:1rem;
        width:100%;
        height:4rem;
    }
    
    .animation{
        font-size:1rem;
        text-align:center;
        width:1.5em;
        height:1.5em;
        top:20%;
        position:relative;
        transition: all ease 2s;
    }
</style>