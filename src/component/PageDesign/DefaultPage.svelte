<script>
    import DefaultSlide from './Slide/defaultSlide.svelte';
    import { hslide } from './hslide.js';
	import { season } from "../../global"
    import { onMount } from "svelte";
    let background = [];


	export let slides = [
		{ childComponent:DefaultSlide, bg: 'transparent', color: '#fff'},
		{ childComponent:DefaultSlide, bg: 'transparent', color: '#fff'},
		{ childComponent:DefaultSlide, bg: 'transparent', color: '#fff'},
		{ childComponent:DefaultSlide, bg: 'transparent', color: '#fff'},
	]

	let cur = 0;
    let t;
    let enbleToMove = true;

	const transition_args = {
		duration: 200,
	}
	
	function prev(e) {
		cur = --cur >= 0 ? cur : slides.length - 1;
	}
	
	function next(e) {
		cur = ++cur % slides.length
	}
	
    const ARROW_LEFT = 37;
	const ARROW_RIGHT = 39;
	function handleShortcut(e) {
        if (e.keyCode === ARROW_LEFT ) {
						prev();
        }
		    if (e.keyCode === ARROW_RIGHT ) {
            next();
        }
    }
	onMount(() => {		
		// background['Spring'] = "#fff";
		// background['Summer'] = "#fff";
		// background['Fall'] = "rgba(168, 168, 168, 0.692)";
		// background['Winter'] = "rgba(168, 168, 168, 0.692)"
        background['Spring'] = "transparent"
		background['Summer'] = "transparent"
		background['Fall'] = "transparent"
		background['Winter'] = "transparent"
	})
    function onWheel(e){
        if(enbleToMove){
            if(e.deltaY < 0){
                prev();
            }
            else{
                next();
            }
            enbleToMove = false;
            clearTimeout(t)
            t = setTimeout(() => {
                enbleToMove = true;
            }, 300)
        }
    }
</script>

<div class = "Page" style="background:{ background[$season] };">
    <div class="inner-wrapper" on:mousewheel={onWheel}>
        {#each slides as slide, id}
            {#if id === cur}
            <div
                     style="background:{slide.bg};"
                     class="slide"
                     in:hslide={transition_args}
                     out:hslide={transition_args}
            >
                <svelte:component this={slide.childComponent} color={slide.color} />
            </div>
            {/if}
        {/each}
    </div>
</div>

<style>	
	.inner-wrapper {
		height: 100%;
		width: 100%;
		display: flex;
		position: absolute;
	}

	.slide {
		flex: 1 0 auto;
		width: 100%;
		height: 100%;
		background: red;
	    align-items: center;
		justify-content: center;
		display: flex;
		text-align: center;
		font-weight: bold;
		font-size: 2rem;
	}

    .Page {
        position:absolute;
        top:5%;
        left:5%;
        width:90%;
        height:90%;
        background-color:#0051ffb4;
        opacity:0.7;
        z-index: 500;
    }
</style>