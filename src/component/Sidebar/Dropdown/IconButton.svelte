<script>
	import Icon from '../Icon/Icon.svelte';
	import { blur } from 'svelte/transition';
	
	export let path = '';
	export let RightComment = "";
	export let Comment = "";
	export let showComment = false;
	export let iconColor = "currentColor"
    function empty(){

    }
</script>

<div class="icon-button" on:click|preventDefault on:keydown={empty} on:keyup={empty} style="border-radius:{showComment=='' ? '5px' : '5px'};">
	{#if RightComment == "" }
	<Icon color={iconColor} path={path} />
	{:else}
	<Icon color={iconColor} str={path} />
	{/if}
	{#if showComment}
	<div class='comment' in:blur={{duration:200, }}>
		{Comment}
	</div>
	{/if}
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
        text-align:center;
	    align-items: center;
		justify-content: center;
		transition: all 300ms;
		color:#fff;
	}

	.icon-button:hover {
		filter: brightness(1.2);
	}
	.comment{
		margin-left: 5px;
		transition: all ease 300ms;
	}
</style>