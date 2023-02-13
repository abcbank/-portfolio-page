<script>
	import Icon from '../Icon/Icon.svelte';
	import IconButton from './IconButton.svelte';
	import {mdiCheckBold} from "@mdi/js"
	export let leftIcon = null;
	export let rightIcon = "";
	export let isChecked;
	export let leftIconColor = "currentcolor"
	export let rightIconColor = "currentcolor"
	function empty(){}
</script>

<div class="menu-item" on:click|preventDefault on:keydown={empty} on:keyup={empty}>
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