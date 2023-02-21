<script>
    import DefaultSlide from './Slide/defaultSlide.svelte';
    import { hslide } from './hslide.js';
	import { Device, LastPage, season } from "../../global"
    import { onMount } from "svelte";
    import { mdiRayEndArrow } from '@mdi/js';
    let background = [];


	function changeSlide(slide) {
		cur = slide;
	}

	export let slides = [
		{ childComponent:DefaultSlide, bg: 'transparent', color: '#fff', buttonBackColor: "#000", buttonBorderColor: "#fff", buttonSelectedColor: "#000"},
		{ childComponent:DefaultSlide, bg: 'transparent', color: '#fff', buttonBackColor: "#000", buttonBorderColor: "#fff", buttonSelectedColor: "#000"},
		{ childComponent:DefaultSlide, bg: 'transparent', color: '#fff', buttonBackColor: "#000", buttonBorderColor: "#fff", buttonSelectedColor: "#000"},
		{ childComponent:DefaultSlide, bg: 'transparent', color: '#fff', buttonBackColor: "#000", buttonBorderColor: "#fff", buttonSelectedColor: "#000"},
	]
	
	let cur = $LastPage["WindowResized"] == true ? $LastPage["Index"] : 0;
    let t;
    let enbleToMove = true;
    let drawComponent = true;

	let isDragging = false;
	let mouseDownLocation = 0;
	let mouseLocation = 0;

	let curPage = 1;
	let maxPage = 0;
	
	$LastPage["WindowResized"] = false;

	const transition_args = {
		duration: 200,
	}
	
	function prev(e) {
		cur = --cur >= 0 ? cur : slides.length - 1;
		$LastPage["Index"] = cur;
		
	}
	
	function next(e) {
		cur = ++cur % slides.length
		$LastPage["Index"] = cur;
	}
	
    function touchStart(e) {
        mouseLocation = mouseDownLocation = getPositionX(e);
		
        isDragging = true;
    }

    function touchMove(e) {
		if(isDragging){
			mouseLocation = getPositionX(e);
		}
    }

    function touchEnd(e) {
		if(isDragging){
			isDragging = false;
			const movedBy = mouseLocation - mouseDownLocation;
			console.log(mouseLocation);
			console.log(mouseDownLocation);	
			if (movedBy < -100) next();
			else if (movedBy > 100) prev();
		}
    }

    // Helper functions
    function getPositionX(event) {
      return event.type.includes('mouse')
        ? event.pageX
        : event.touches[0].clientX;
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

<svelte:window 
 on:touchstart={touchStart}
 on:touchend={touchEnd}
 on:touchmove={touchMove}
 on:mousedown={touchStart}
 on:mouseup={touchEnd}
 on:mouseleave={touchEnd}
 on:mousemove={touchMove} />

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
                <svelte:component this={slide.childComponent} color={slide.color} bind:curPage={curPage} bind:maxPage={maxPage} />
				
				<div
				class="footer" style="font-size: 1rem; bottom:20px; text-align:center; color:{slide.color};">
					{curPage} / {maxPage}
				</div>
            </div>
            {/if}
        {/each}
    </div>
    <div class="footer">
        <div class="dots">
            {#each slides as slide, i}
                <button on:click={()=>changeSlide(i)} 
                    class="dot" class:selected={cur == i} 
                    style="background:{cur== i ? slide.buttonSelectedColor : slide.buttonBackColor}; border: 1px solid {slide.buttonBorderColor}">{i+1}</button>
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
		width: 100%;
		height: 100%;
		background: red;
		flex: 1 0 auto;
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
        overflow: hidden; 
        white-space: nowrap;
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
        border: 1px solid #fff;
		border-radius: 25%;
		font-size: 0;
		margin: 0.3rem;
		opacity: 0.3;

        transition: all ease 0.2s;
	}
	
	.dot.selected {
        width:10px;
		opacity: 1;
		border-radius: 25%;
	}
</style>