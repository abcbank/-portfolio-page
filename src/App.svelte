
<script>
    import { onMount } from "svelte";
	import { Color, LastPage, Device, ContextVisible, season } from "./global"
	import { bench, fish_01, fish_02, fish_03, fish_04, fish_05, fish_06, fish_07, fish_08, fish_09, fish_10, fish_11, fish_12 } from "./asciiArts"
    import Navbar from "./component/Navbar.svelte";
	import Snowflakes from "./component/Snowflakes.svelte";
	import Sakuraflakes from "./component/Sakura.svelte"
	import Lake from "./component/Lake.svelte"
	import Park from "./component/Park.svelte"
	import jquery from "jquery"
	import Router from 'svelte-spa-router'

	import Main from './component/routes/Main.svelte'
	import Profile from './component/routes/Profile.svelte'
	import Projects from './component/routes/Projects.svelte'
	import Outsourcing from './component/routes/Outsourcing.svelte'
	import Projects_2021 from './component/routes/2021/Projects.svelte'
	import Projects_2022 from './component/routes/2022/Projects.svelte'
	import Projects_2023 from './component/routes/2023/Projects.svelte'

	import Outsourcing_2022 from './component/routes/2022/Outsourcing.svelte'
	import Outsourcing_2023 from './component/routes/2023/Outsourcing.svelte'

	const routes = {
		'/': Main,
		'/Profile': Profile,
		'/2021/Projects':Projects_2021,
		'/2022/Projects':Projects_2022,
		'/2023/Projects':Projects_2023,
		'/Projects':Projects,
		'/2022/Outsourcing':Outsourcing_2022,
		'/2023/Outsourcing':Outsourcing_2023,
		'/Outsourcing':Outsourcing
	}

	let premx = 0;
	let premy = 0;
	let background = [];
	let NavbarComponent = 0;
	let drawComponent = true;
	let t;


    $Color["foreColor"] = {
        "Spring": "#000",
        "Summer": "#000",
        "Fall": "#fff",
        "Winter": "#fff"
    }
    $Color["backColor"]  = {
        "Summer": "transparent",
        "Spring": "transparent",
        "Fall": "transparent",
        "Winter": "transparent"
    }
    $Color["btnBackColor"] = {
        "Spring": "#000",
        "Summer": "#000",
        "Fall": "#fff",
        "Winter": "#fff"
    }
    $Color["btnBdrColor"] = {
        "Spring": "#fff",
        "Summer": "#fff",
        "Fall": "#000",
        "Winter": "#000"
    }
    $Color["btnSelectedColor"]  = {
        "Spring": "#000",
        "Summer": "#000",
        "Fall": "#fff",
        "Winter": "#fff"
    }

	let month = new Date().getMonth() + 1;
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
    jquery.get('/assets/ascii/fish_1.txt', function(data) {
        $fish_01 = data;
    });
	
    jquery.get('/assets/ascii/fish_2.txt', function(data) {
        $fish_02 = data;
    });
	
    jquery.get('/assets/ascii/fish_3.txt', function(data) {
        $fish_03 = data;
    });
	
    jquery.get('/assets/ascii/fish_4.txt', function(data) {
        $fish_04 = data;
    });

    jquery.get('/assets/ascii/fish_5.txt', function(data) {
        $fish_05 = data;
    });
	
    jquery.get('/assets/ascii/fish_6.txt', function(data) {
        $fish_06 = data;
    });
	
    jquery.get('/assets/ascii/fish_7.txt', function(data) {
        $fish_07 = data;
    });
	
    jquery.get('/assets/ascii/fish_8.txt', function(data) {
        $fish_08 = data;
    });

    jquery.get('/assets/ascii/fish_9.txt', function(data) {
        $fish_09 = data;
    });
	
    jquery.get('/assets/ascii/fish_10.txt', function(data) {
        $fish_10 = data;
    });
	
    jquery.get('/assets/ascii/fish_11.txt', function(data) {
        $fish_11 = data;
    });
	
    jquery.get('/assets/ascii/fish_12.txt', function(data) {
        $fish_12 = data;
    });

    jquery.get('/assets/ascii/bench.txt', function(data) {
        $bench = data;
    });

	var mobile_keys = new Array('iphone','ipad','android','blackberry','windows phone',
            'windows ce','lg','mot','samsung','sonyericsson','nokia');

	$Device["agent"] = navigator.userAgent.toLowerCase();

	onMount(() => {		
		$Device["isMobile"] = false;
		$LastPage["WindowResized"] = false;
		$LastPage["Index"] = 0;
		
		for(var i in mobile_keys){
			if($Device["agent"].match(mobile_keys[i])){ 
				$Device["isMobile"] = true;
				break;
			}
		}
		$ContextVisible = true;
		background['Spring'] = "linear-gradient(to bottom, #089acf 0%, #a1c4fd 60%,#c2e9fb 90%,#8A3B12 100%)";
		background['Summer'] = "linear-gradient(-45deg, #089acf, #0bcea0)";
		background['Fall'] = "linear-gradient(to bottom, #0051ffb4 0%, #a1c4fd 60%,#c2e9fb 90%,#8A3B12 100%)";
		background['Winter'] = "linear-gradient(to bottom, #071B26 0%,#071B26 30%,#8A3B12 95%, #fff 100%)"
	})

    function windowResize(){
        drawComponent = false;
		$LastPage["WindowResized"] = true;
        clearTimeout(t)
        t = setTimeout(() => {
            drawComponent = true;
        }, 300)
    }
</script>

<svelte:window on:resize={windowResize} />
<main style="background:{ background[$season] };">
	<Navbar bind:height={NavbarComponent} />
	<div class="full-landing-image">
		{#if $season == "Spring"}
			<Sakuraflakes />
		{:else if $season == "Summer"}
			<Lake/>
		{:else if $season == "Fall"}
			{#if drawComponent}
				<Park />
			{/if}
		{:else}
			<Snowflakes />
		{/if}
		{#if $ContextVisible && drawComponent}
		<div id="details" style="top:{NavbarComponent}px; height:{document.body.clientHeight - NavbarComponent}px;">
			<Router {routes} />
		</div>
		{/if}
	</div>
</main>

<style>
	main {
		margin: 0 auto;
		width:100%;
		height:100vh;
		overflow:hidden;
	}

	.full-landing-image{
		display:flex;
	}
	#details{
        position:absolute;
		width:100%;
		height:90%;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>