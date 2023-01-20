
<script>
    import { onMount } from "svelte";
	import { mx, my, dx, dy, clicked } from "./mouseStatus"
	import { norm1, norm2, norm3, norm4, norm5, norm6, norm7, norm8, norm9, norm10, norm11, norm12 } from "./fishTemplate"
    import Navbar from "./component/Navbar.svelte";
	import Snowflakes from "./component/Snowflakes.svelte";
	import Sakuraflakes from "./component/Sakura.svelte"
	import Lake from "./component/Lake.svelte"
	export let name;
	import jQuery from "jquery"

	let premx = 0;
	let premy = 0;
	$mx = 0;
	$my = 0;
	let season = "";
	let timer;
	let background;

    jQuery.get('/assets/ascii/fish_1.txt', function(data) {
        $norm1 = data;
    });
	
    jQuery.get('/assets/ascii/fish_2.txt', function(data) {
        $norm2 = data;
    });
	
    jQuery.get('/assets/ascii/fish_3.txt', function(data) {
        $norm3 = data;
    });
	
    jQuery.get('/assets/ascii/fish_4.txt', function(data) {
        $norm4 = data;
    });

    jQuery.get('/assets/ascii/fish_5.txt', function(data) {
        $norm5 = data;
    });
	
    jQuery.get('/assets/ascii/fish_6.txt', function(data) {
        $norm6 = data;
    });
	
    jQuery.get('/assets/ascii/fish_7.txt', function(data) {
        $norm7 = data;
    });
	
    jQuery.get('/assets/ascii/fish_8.txt', function(data) {
        $norm8 = data;
    });

    jQuery.get('/assets/ascii/fish_9.txt', function(data) {
        $norm9 = data;
    });
	
    jQuery.get('/assets/ascii/fish_10.txt', function(data) {
        $norm10 = data;
    });
	
    jQuery.get('/assets/ascii/fish_11.txt', function(data) {
        $norm11 = data;
    });
	
    jQuery.get('/assets/ascii/fish_12.txt', function(data) {
        $norm12 = data;
    });


	function handleMouseclick() {
		$clicked = true;
	}
	function handleMousemove(event) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			$dx = 0;
			$dy = 0;
		}, 50)
		premx = $mx;
		premy = $my;
		$mx = event.clientX;
		$my = event.clientY;
		$dx = premx - $mx;
		$dy = premy - $my; 		
	}
	onMount(() => {		
		let month = new Date().getMonth() + 1;
		
		if(3 <= month && month <= 5){
			background = "#fff"
			season = "Spring";
		}
		else if(6 <= month && month <= 8){
			background = "linear-gradient(to right, #BDFFF3, #4AC29A)";
			season = "Summer"
		}
		else if(9 <= month && month <= 11){
			season = "Fall"
		}
		else{
			background = "linear-gradient(to right, #BDFFF3, #4AC29A)";
			season = "Summer"
			// background = "#fff"
			// season = "Winter"
		}
	})
	
	function handleClick() {
		alert('Button Clicked');
	}
</script>
<main on:mousemove={handleMousemove} style="background:{ background };">
	<div class="full-landing-image">
		<Navbar  />
		{#if season == "Spring"}
		<Sakuraflakes />
		{:else if season == "Summer"}
		<Lake/>
		{:else if season == "Fall"}
		<Sakuraflakes />
		{:else}
		<!-- <Lake/> -->
		<Snowflakes />
		{/if}
		<div id="details">
		</div>
	</div>
</main>

<style>
	main {
		margin: 0 auto;
		width:100%;
		max-width: 240px;
		height:100vh;
		background: linear-gradient(to right, #BDFFF3, #4AC29A);;
		overflow:hidden;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>