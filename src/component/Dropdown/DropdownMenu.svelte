<script>
	import { fly } from 'svelte/transition';
	import DefaultMenu from './DefaultMenu.svelte';
	
	export let Menu = [{Name: 'main', Component: DefaultMenu},];
	export let activeMenu = 'main';
	export let Side = false;
	export let sideWidth = 300;
	export let afterSelect;

	let menuHeight = 0;
	let menuEl = null;
</script>

<div class="dropdown stack" class:side={Side} style="width: {Side ? document.body.clientWidth - sideWidth - 20 : 300}px; height: {menuHeight}px;">
	{#each Menu as Config}
		{#if activeMenu == Config.Name}
			<svelte:component this={Config.Component} afterSelect={afterSelect} Side={Side} bind:height={menuHeight} bind:activeMenu={activeMenu} />
		{/if}
	{/each}
	<!-- {#if activeMenu === 'main'}
		<div class="menu" in:fly={{ x: -300 }} out:fly={{ x: -300 }} bind:this={menuEl}>
			<MenuItem on:click={() => activeMenu = "profile"} leftIcon={mdiAccount} rightIcon={mdiChevronRight}>My Profile</MenuItem>
			<MenuItem on:click={() => activeMenu = "settings"} leftIcon={mdiCog} rightIcon={mdiChevronRight}>Settings</MenuItem>
		</div>
	{/if}
	
	{#if activeMenu === 'profile'}
		<div class="menu" in:fly={{ x: 300 }} out:fly={{ x: 300 }} bind:this={menuEl}>
			 <MenuItem on:click={() => activeMenu = "main"} leftIcon={mdiArrowLeft}>
				 Back
			</MenuItem>
			
			<MenuItem leftIcon={mdiAccountBox}>Change Picture</MenuItem>
			<MenuItem leftIcon={mdiSecurity}>Permissions</MenuItem>
		</div>
	{/if}
	
	{#if activeMenu === 'settings'}
		<div class="menu" in:fly={{ x: 300 }} out:fly={{ x: 300 }} bind:this={menuEl}>
			 <MenuItem on:click={() => activeMenu = "main"} leftIcon={mdiArrowLeft}>
				 Back
			</MenuItem>
			
			<MenuItem leftIcon={mdiCog}>Setting 1</MenuItem>
			<MenuItem leftIcon={mdiCog}>Setting 2</MenuItem>
			<MenuItem leftIcon={mdiCog}>Setting 3</MenuItem>
			<MenuItem leftIcon={mdiCog}>Setting 4</MenuItem>
			<MenuItem leftIcon={mdiCog}>Setting 5</MenuItem>
			<MenuItem leftIcon={mdiCog}>Setting 6</MenuItem>
			<MenuItem leftIcon={mdiCog}>Setting 7</MenuItem>
		</div>
	{/if}
	 -->
</div>

<style>
	.dropdown {
		position: absolute;
		top:58px;
		width: 300px;
		max-width: 300px;
		height:500px;
		transform: translateX(-45%);
		background-color: var(--bg);
		border: var(--border);
		border-radius: var(--border-radius);
		overflow: hidden;
		transition: height var(--speed) ease;
	}
	
	.stack {
		display: grid;
		align-items: start; /* allow to shrink */
	}
	
	.stack > :global(*) {
		grid-area: 1 / 1;
    }

	.side{
		transform: translateX(-100%);
		left: -10px;
		top: 10px;
	}
</style>