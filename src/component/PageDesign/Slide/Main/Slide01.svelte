<script>
    import { Tooltip } from 'sveltestrap'
    import { Device, Color, season } from "../../../../global"
    import DefaultSlide from '../defaultSlide.svelte'
    import Icon from "../../../Icon/Icon.svelte"
    import { onMount } from 'svelte'
    import { fade } from "svelte/transition"
    import { mdiCursorDefaultClick } from '@mdi/js';
    import IconButton from "../../../Dropdown/IconButton.svelte"
    export let color;

    let Cur = false;
    let Slide_01 = true;
    let Slide_02 = false;
    let animationStart = false;
    let visibility = true;
    let isOpen = true;
    let t;

    const calcMainFontSize = () => !$Device["isMobile"] ? "2rem" : "25px";
    const calcSubFontSize = () => !$Device["isMobile"] ? "1rem" : "18px";

    function startSlideChangeTimer(){
        clearTimeout(t);
        t = setTimeout(() => {
            Slide_01 = false;
            clearTimeout(t);
            t = setTimeout(() => {
                Slide_02 = true;
                startAnimationTimer();
            }, 300)
        }, 1000)
    }
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
        Slide_01= true;
        Slide_02 = false;
        startSlideChangeTimer();
    })
</script>

<DefaultSlide>
    <div class="context" style="color:{color}; font-size:{calcMainFontSize()};">
        {#if Slide_01}
            <p out:fade={{duration:200,}}>Welcome to abcBank</p>
        {:else if Slide_02}
            <div class="Section" style="height:100%; width:100%; font-size:{calcMainFontSize()};" in:fade={{delay:300, duration:200}}>
                <div class="header" style="height:20%;">
                    드래그를 통해 슬라이드를 이동해 보세요.
                </div>
                <div class="howToMove">
                    {#if visibility}
                    <div class='animation' style="left: {!animationStart ? 75 : 25}%;"  in:fade={{duration:200}} out:fade={{duration:200}}>
                        <Icon size={calcSubFontSize()} color={$Color["foreColor"][$season]} path={mdiCursorDefaultClick} />
                    </div>
                    {/if}
                </div>
            </div>
        <!-- <div class="Section" style="width:100%;height:100%" in:fade={{delay:300, duration:200}}>
            <div class="Section" style="height:100%;">
                Slide / Wheel to move page
                {#if visibility}
                <div class='animation' style="left: {!animationStart ? 70 : 30}%;"  in:fade={{duration:200}} out:fade={{duration:200}}>
                    <Icon size="3rem" color={$Color["foreColor"][$season]} path={mdiCursorDefaultClick} />
                </div>
                {/if}
            </div>
             <div class="Section Left" style="font-size:1.5rem; height:70%; width:100%;" in:fade={{delay:300, duration:200}}>
                <div class="Section" style="height:100%; width:45%;">
                    <div class="header">
                        Move next page
                    </div>
                    <div class="Section Left"style="height:85%; width:100%;">
                        <div class="howToMove">
                            <div class="header" style="margin-left:0.75em; font-size:1rem;">
                                Drag Screen
                            </div>
                            {#if visibility}
                            <div class='animation' style="left: {!animationStart ? 20 : 80}%;"  in:fade={{duration:200}} out:fade={{duration:200}}>
                                <Icon color={$Color["foreColor"][$season]} path={mdiCursorDefaultClick} />
                            </div>
                            {/if}
                        </div>
                        <div class="howToMove" in:fade={{duration:200}} out:fade={{duration:200}}>
                        </div>
                    </div>
                </div>
                <div class="Section" style="height:100%; width:45%;">
                    <div class="header">
                    Move previous page
                    </div>
                    <div class="Section Left"style="height:85%; width:100%;">
                        <div class="howToMove">
                            <div class="header" style="margin-left:0.75em; font-size:1rem;">
                                Drag Screen
                            </div>
                            {#if visibility}
                            <div class='animation' style="left: {!animationStart ? 80 : 20}%;"  in:fade={{duration:200}} out:fade={{duration:200}}>
                                <Icon color={$Color["foreColor"][$season]} path={mdiCursorDefaultClick} />
                            </div>
                            {/if}
                        </div>
                        <div class="howToMove" in:fade={{duration:200}} out:fade={{duration:200}}>
                        </div>
                    </div>
                </div>
            </div> 
        </div> -->
        {/if}
    </div>
</DefaultSlide>

<style>
    .context{
		display: flex;
        text-align:center;
	    align-items: center;
		justify-content: center;
        width:100%;
        height:100%;
        overflow: hidden; 
        white-space: nowrap;
        flex-direction:column;
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
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
</style>