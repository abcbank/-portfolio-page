<script>
    import DefaultSlide from './Slide/defaultSlide.svelte';
    import { hslide } from './hslide.js';
	import { season } from "../../global"
    import { onMount } from "svelte";
    let background = [];

	function changeSlide(slide) {
		cur = slide;
	}

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
    <div class="footer">
        <div class="dots">
            {#each slides as slide, i}
                <button on:click={()=>changeSlide(i)} class="dot" class:selected={cur == i}>{i+1}</button>
            {/each}
        </div>
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

    .footer{
        width:100%;
        position:absolute;
        bottom:0;
    }

	.dots {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 8px;
	}
	
	.dot {
		width: 8px;
		height: 8px;
		background: #000;
		border-radius: 25%;
		font-size: 0;
		margin: 0.3rem;
		opacity: 0.3;

        transition: all ease 0.2s;
	}
	
	.dot.selected {
        width:10px;
		opacity: 1;
	}
</style>