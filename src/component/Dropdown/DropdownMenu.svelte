<script>
	import { fly } from 'svelte/transition';
	
	let activeMenu = 'main';
	let menuHeight = 0;
	let menuEl = null;
	
	$: menuHeight = menuEl?.offsetHeight ?? 0;
</script>

<div class="dropdown stack" style="height: {menuHeight}px">
    <div class="menu" in:fly={{ x: -300 }} out:fly={{ x: -300 }} bind:this={menuEl}>
        <slot />
    </div>
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
		top: 58px;
		width: 300px;
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
	
	.menu {
		width: 100%;
        opacity: 1;
        background-color: #242526;
        color:#fff;
	}
</style>