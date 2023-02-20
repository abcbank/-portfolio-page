<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'
    import { onMount } from "svelte";
    export let color = "transparent";
    import { fade } from "svelte/transition"
    export let fontSize = 2
    
    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
    let img;
	let loaded = false;
	let failed = false;
	let loading = false;
    let src = "http://drive.google.com/uc?export=view&id=1Se5rPh3F9fBktwmutFTCQ6guNDFQHpXM";

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

<DefaultPage color={color} fontSize={fontSize}>
    <div style="height:20%;">
        <p>곡의 분석 및 해석</p>
    </div>
    <div style="height:70%; font-size:{calcSubFontSize()};">
    {#if loaded}
        <img in:fade={{delay:300, duration:300,}} {src} width="100%" height="100%" alt="robot-piano-data" />
    {:else if failed}
        <img  width="30%" height="30%" src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" alt="Not Found" />
    {:else if loading}
    <p out:fade={{duration:300,}}>Loading Image...</p>
    {/if}
    </div>
</DefaultPage>