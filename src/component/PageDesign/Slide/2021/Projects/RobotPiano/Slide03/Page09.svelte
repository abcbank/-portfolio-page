<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'
    import { fade } from "svelte/transition";

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
    let img;
	let loaded = false;
	let failed = false;
	let loading = false;
    let src = "http://drive.google.com/uc?export=view&id=1Oe-eCuoK_lfh9N7Cqmb4oKpt0qzymJ4-";

    onMount(() => {
			img = new Image();
			img.src = src;
			loading = true;

			img.onload = () => {
					loading = false;
					loaded = true;
			};
			img.onerror = () => {
					loading = false;
					failed = true;
			};
    })
</script>
<DefaultPage color={color} fontSize={subhead}>
    <div style="height:20%;">
        <p>곡의 분석 및 해석</p>
    </div>
    <div style="height:70%; font-size:{context};">
    {#if loaded}
    <img in:fade={{delay:300, duration:300,}} {src} width="100%" height="auto" alt="robot-piano-data" />
    {:else if failed}
        <img  width="30%" height="30%" src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" alt="Not Found" />
    {:else if loading}
    <p out:fade={{duration:300,}}>Loading Image...</p>
    {/if}
    </div>
</DefaultPage>