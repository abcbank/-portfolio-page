<script>
    import { fade } from "svelte/transition"
    export let color = "transparent";
    export let fontSize = 2
</script>

<div class="context" style="color:{color}; font-size:{fontSize}rem;" in:fade={{delay:300, duration:300,}} out:fade={{duration:300,}}>
    <slot />
</div>

<style>
    .context{
        width:100%;
        height:100%;
		display: flex;
        text-align:center;
	    align-items: center;
		justify-content: center;
        overflow: hidden; 
        white-space: nowrap;
        flex-direction:column;
    }
</style>