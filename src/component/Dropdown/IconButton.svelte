<script>
	import Icon from './Icon.svelte';
	
	export let path = '';
    function empty(){

    }
</script>

<div class="icon-button" on:click|preventDefault on:keydown={empty} on:keyup={empty}>
	<Icon {path} />
</div>

<style>
	.icon-button {
		--button-size: calc(var(--nav-size) * 0.5);
		width: var(--button-size);
		height: var(--button-size);
		background-color: #484a4d;
		border-radius: 50%;
		padding: 5px;
		margin: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: filter 300ms;
		color:#fff;
	}

	.icon-button:hover {
		filter: brightness(1.2);
	}
</style>