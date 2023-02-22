<script>
    import { Device, Color, season } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'
    import Icon from "../../../../Icon/Icon.svelte"
    import { onMount } from 'svelte'
    import { fade } from "svelte/transition"
    import { mdiCursorDefaultClick } from '@mdi/js';

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
    
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

<DefaultPage color={color} fontSize={head}>
    <div class="Section" style="height:100%; width:100%;">
        <div class="header" style="font-size:{context}rem; height:20%;">
            물론, 이전 슬라이드도 볼 수 있겠죠?
        </div>
        <div class="howToMove" style="font-size:{context}rem; left: {-head / 2}rem;">
            {#if visibility}
            <div class='animation' style="left: {!animationStart ? 25 : 75}%;"  in:fade={{duration:200}} out:fade={{duration:200}}>
                <Icon size={head.toString() + "rem"} color={$Color["foreColor"][$season]} path={mdiCursorDefaultClick} />
            </div>
            {/if}
        </div>
    </div>
</DefaultPage>

<style>    
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
    .howToMove{
        position:relative;
        font-size:1rem;
        width:100%;
        height:4rem;
    }
    .animation{
        font-size:1rem;
        text-align:center;
        width:1.5rem;
        height:1.5rem;
        top:20%;
        position:relative;
        transition: all ease 2s;
    }
</style>