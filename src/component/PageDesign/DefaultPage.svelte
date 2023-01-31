<script>
	import { season } from "../../global"
    import { onMount } from "svelte";
    let background = [];
	onMount(() => {		
		let month = new Date().getMonth() + 1;

		background['Spring'] = "#fff";
		background['Summer'] = "#fff";
		background['Fall'] = "rgba(168, 168, 168, 0.692)";
		background['Winter'] = "rgba(168, 168, 168, 0.692)"
		
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
</script>

<div class = "Page" style="background:{ background[$season] };">
    <slot></slot>
</div>

<style>
    .Page {
        position:absolute;
        top:10%;
        left:10%;
        width:80%;
        height:80%;
        background-color:#0051ffb4;
        opacity:0.7;
        z-index: 500;
    }
</style>