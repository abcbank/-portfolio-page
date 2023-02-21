<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
    let img;
    let t
	let loaded = false;
	let failed = false;
	let loading = false;
    let src = "";

</script>
<DefaultPage color={color} fontSize={subhead}>
    <div style="font-size:{context}rem;">
        <iframe width="80%" height="80%" src="https://drive.google.com/file/d/1JxPYzRioZpXcnBj_IlXmPO0eU1L53yLn/preview" title="run_1"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</DefaultPage>

<style>
    div{
        height:100%;
        width:100%; 
		flex: 1 0 auto;
	    align-items: center;
		justify-content: center;
		display: flex;
		text-align: center;
    }
    iframe{

    }
</style>