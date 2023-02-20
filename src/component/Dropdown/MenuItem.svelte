<script>
	import Icon from '../Icon/Icon.svelte';
	import IconButton from './IconButton.svelte';
	import {mdiCheckBold} from "@mdi/js"
	export let leftIcon = null;
	export let rightIcon = "";
	export let isChecked;
	export let leftIconColor = "currentcolor"
	export let rightIconColor = "currentcolor"
	export let textColor = "var(--text-color)"
	function empty(){}
</script>

<div class="menu-item" on:click|preventDefault on:keydown={empty} on:keyup={empty}
	style="color:{textColor};">
	<IconButton iconColor={leftIconColor} path={leftIcon ?? ''} />
	
	<slot />
	
	{#if isChecked}
		<span class="icon-right">
			<Icon color={rightIconColor} path={ mdiCheckBold } />
		</span>
	{:else}
		<span class="icon-right">
			<Icon  color={rightIconColor} path={ rightIcon } />
		</span>
	{/if}
</div>

<style>
	.menu-item {
		font-size: min(max(2vw, 0.75rem), 1rem);
		
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
</style>