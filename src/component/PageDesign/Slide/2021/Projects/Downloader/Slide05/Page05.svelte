<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
    let img;
    let t
	let loaded = false;
	let failed = false;
	let loading = false;
    let src = "http://drive.google.com/uc?export=view&id=1dtTkVfi6qTusvsAfnwCtEetuvzOOqES6";
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
    <img in:fade={{ duration:300,}} {src} width="80%" height="auto" alt="downloader_zig_2" />
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