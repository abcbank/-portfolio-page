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
        {#if $Device["isMobile"]}
        <p>
            영상 재생은 데스크탑에서만 지원됩니다.<br/>
            데스크탑으로 접속 후 확인해주세요.
        </p>
        {:else}
        <iframe width="80%" height="80%" src="https://drive.google.com/file/d/12zVul2NlrqlZdjlz9Yf-n_7M1Di-NKBj/preview"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
        title="run_1"></iframe>
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
    iframe{

    }
</style>