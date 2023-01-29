
<script>
    import { onMount } from "svelte";
	import { season } from "./global"
	import { norm1, norm2, norm3, norm4, norm5, norm6, norm7, norm8, norm9, norm10, norm11, norm12 } from "./fishTemplate"
    import Navbar from "./component/Navbar.svelte";
	import Snowflakes from "./component/Snowflakes.svelte";
	import Sakuraflakes from "./component/Sakura.svelte"
	import Lake from "./component/Lake.svelte"
	import Park from "./component/Park.svelte"
	import Project_2022 from "./component/Project_2022.svelte"
	import jQuery from "jquery"

	let premx = 0;
	let premy = 0;
	let background = [];


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

	onMount(() => {		
		let month = new Date().getMonth() + 1;

		background['Spring'] = "linear-gradient(to bottom, #a1c4fd 0%, turquoise 60%,#c2e9fb 90%,#8A3B12 100%)";
		background['Summer'] = "linear-gradient(-45deg, #089acf, #0bcea0)";
		background['Fall'] = "#fff"
		background['Winter'] = "linear-gradient(to bottom, #071B26 0%,#071B26 30%,#8A3B12 95%, #fff 100%)"
		
		if(3 <= month && month <= 5){
			$season = "Spring";
		}
		else if(6 <= month && month <= 8){
			$season = "Summer"
		}
		else if(9 <= month && month <= 11){
			$season = "Fall"
		}
		else{
			$season = "Winter"
		}
	})
	
	function handleClick() {
		alert('Button Clicked');
	}
</script>
<main style="background:{ background[$season] };">
	<div class="full-landing-image">
		{#if $season == "Spring"}
		<Sakuraflakes />
		{:else if $season == "Summer"}
		<Lake/>
		{:else if $season == "Fall"}
		<Park />
		{:else}
		<Snowflakes />
		{/if}
		<div id="details">
			<Project_2022 />
		</div>
	</div>
	<Navbar  />
</main>

<style>
	main {
		margin: 0 auto;
		width:100%;
		height:100vh;
		overflow:hidden;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	full-landing-image{
		display:flex;
	}
	#details{
		padding:5%;
		width:100%;
		height:100%;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>