
<script>
    import { onMount } from "svelte";
    import Navbar from "./component/Navbar.svelte";
	import Snowflakes from "magic-snowflakes"
	export let name;

	onMount(() => {		
		let month = new Date().getMonth() + 1;
		let season = "";
		let field;
		
		if(3 <= month && month <= 5){
			var sakura = new Sakura('main');
			season = "Spring";
		}
		else if(6 <= month && month <= 8){
			season = "Summer"
		}
		else if(9 <= month && month <= 11){
			season = "Fall"
		}
		else{
			var sf = new Snowflakes
			({
				count:100
			});
			season = "Winter"
		}
	})
</script>
<main>
	
	<Navbar />
	<div id="details">
	</div>
</main>

<style>
	main {
		margin: 0 auto;
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