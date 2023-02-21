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
    let src = "http://drive.google.com/uc?export=view&id=1a6fIPrFu7kSj36pkEouYFbF-v0KZdp-n";

    onMount(() => {
			img = new Image();
			img.src = src;
			loading = true;

			img.onload = () => {
                clearTimeout(t);
                loading = false;
                t = setTimeout(() => {
					loaded = true;
                }, 350)
			};
			img.onerror = () => {
					loading = false;
                t = setTimeout(() => {
					failed = true;
                }, 350)
			};
    })
</script>
<DefaultPage color={color} fontSize={subhead}>
    <div style="font-size:{context}rem;">
    {#if loaded}
    <img in:fade={{ duration:300,}} {src} width="auto" height="80%" alt="downloader_total" />
    {:else if failed}
    <img  width="30%" height="30%" src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" alt="Not Found" />
    {:else if loading}
    <p out:fade={{duration:300,}}>Loading Image...</p>
    {/if}
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
</style>