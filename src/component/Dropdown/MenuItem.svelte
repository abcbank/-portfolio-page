<script>
	import Icon from './Icon.svelte';
	import IconButton from './IconButton.svelte';
	
	export let leftIcon = null;
	export let rightIcon = null;
    function empty(){

    }
</script>

<div class="menu-item" on:click|preventDefault on:keydown={empty} on:keyup={empty}>
	<IconButton path={leftIcon ?? ''} />
	
	<slot />
	
	{#if rightIcon}
		<span class="icon-right">
			<Icon path={rightIcon ?? ''} />
		</span>
	{/if}
</div>

<style>
	.menu-item {
		height: 50px;
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 8px;
		align-items: center;
		border-radius: var(--border-radius);
		transition: background var(--speed);
		padding: 0.5rem;
		color: var(--text-color);
	}
	
	.menu-item:hover {
		background-color: #525357;
	}
</style>