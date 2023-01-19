
<script>
    import { onMount } from "svelte";
	import { mx, my, dx, dy, mouse } from "./stores"
    import Navbar from "./component/Navbar.svelte";
	//import Snowflakes from "magic-snowflakes"
	import Snowflakes from "./component/Snowflakes.svelte";
	import Sakuraflakes from "./component/Sakura.svelte"
	export let name;

	let premx = 0;
	let premy = 0;
	$mx = 0;
	$my = 0;
	let mouseArea = 150;
	let season = "";
	let timer;

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

		// console.log($dx);
		// console.log($dy);

		// let targets;
		// if(season == "Spring"){
		// 	targets = document.getElementsByClassName("sakura")
		// }
		// else if(season == "Summer"){
		// }
		// else if(season == "Fall"){
		// }
		// else{
		// 	targets = document.getElementsByClassName("snowflake")
		// }

		// Array.from(targets).forEach(function(target){
		// 	const box = target.getBoundingClientRect()
		// 	const xCenter = (box.left + box.right) / 2
		// 	const yCenter = (box.top + box.bottom) / 2
		
		// 	if(mx - mouseArea / 2 <= xCenter && xCenter <= mx + mouseArea / 2 && my - mouseArea / 2 <= yCenter && yCenter <= my + mouseArea / 2){
		// 		if(mx - mouseArea / 2 <= xCenter && xCenter <= mx){
		// 			target.style.left = mx  - mouseArea / 2 + dx;
		// 		}
		// 		else{
		// 			target.style.left = mx + mouseArea / 2 + dx;
		// 		}
		// 		if(my - mouseArea / 2 <= yCenter && yCenter <= mx){
		// 			target.style.top = my - mouseArea / 2 + dy;
		// 		}
		// 		else{
		// 			target.style.top = my + mouseArea / 2 + dy;
		// 		}
		// 		//target.style.visibility = 'hidden';
		// 	}
		// 	else{
		// 		//target.style.visibility = 'visible';
		// 	}
		// 	// console.log()
		// 	// console.log()
		// })

		
	}
	onMount(() => {		
		let month = new Date().getMonth() + 1;
		
		if(3 <= month && month <= 5){
			season = "Spring";
		}
		else if(6 <= month && month <= 8){
			season = "Summer"
		}
		else if(9 <= month && month <= 11){
			season = "Fall"
		}
		else{
			season = "Winter"
		}
	})
</script>
<main on:mousemove={handleMousemove}>
	
	<Navbar  />
	<Sakuraflakes />
	<div id="details">
	</div>
</main>

<style>
	main {
		margin: 0 auto;
		width:100%;
		max-width: 240px;
		height:100vh;
		background: #000;
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