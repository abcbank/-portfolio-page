<script>
	import { fly } from 'svelte/transition';
	import MenuItem from './MenuItem.svelte';
	export let height = null;
    export let in_x = -300;
    export let out_x = -300;

    export let activeMenu = "";
</script>

<div class="menu" in:fly={{ x: in_x }} out:fly={{ x: out_x }} bind:clientHeight={height}>
    <slot/>
</div>

<style>
	.menu {
		border: var(--border);
		border-radius: var(--border-radius);
		width: 100%;
        opacity: 1;
        background-color: #242526;
        color:#fff;
	}
</style>