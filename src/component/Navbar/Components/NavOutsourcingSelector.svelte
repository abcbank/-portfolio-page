<script>
	import { fade } from 'svelte/transition';
    import { Device, ContextVisible, LastPage } from '../../../global'
    import { mdiCurrencyKrw,  } from '@mdi/js';
	import NavItem from '../../Dropdown/NavItem.svelte';
	import DropdownMenu from '../../Dropdown/DropdownMenu.svelte';
	import IconButton from '../../Dropdown/IconButton.svelte';
    import SideTrigger from '../../Dropdown/SideTrigger.svelte';
    import { onMount } from 'svelte'
    import OutsourcingMain from '../../DropdownMenus/Outsourcing_Main.svelte';
    import Outsourcing_2022 from '../../DropdownMenus/Outsourcing_2022.svelte';
    import Outsourcing_2023 from '../..//DropdownMenus/Outsourcing_2023.svelte';

    let SwitchStatus = $ContextVisible;
    let width = 0;

    
    export let height = 0;
    export let afterSelect;
    export let isSide = false;
    export let onOpen;
    export let pushFunc;
    export let isOpen = false;
    export let sideWidth = 300;

    

    function empty(){}

    onMount(()=>{
        if($LastPage["Layer1"] == 'outsourcing')
        {

        }
        
    })
</script>
<div class = "OutsourcingSelector"class:side={isSide} style="height:{height}px;" in:fade={{ delay: 100 }}>
<NavItem bind:open={isOpen} Side={ isSide } preOpen={onOpen}>
    <span slot="trigger" on:click={(event) => {
        // if(!isSide) 
        //     pushFunc("/outsourcing")
        }} on:keypress={empty}>
        {#if !isSide}
        <IconButton path={mdiCurrencyKrw} Comment="Outsourcing" bind:showComment={isOpen} />
        {:else}
        <SideTrigger leftIcon={mdiCurrencyKrw} bind:isOpen={isOpen} isDropdown={true} rightIconColor="#fff" textColor="#fff" >Outsourcing</SideTrigger>
        {/if}
    </span>
    <DropdownMenu Side={isSide} afterSelect={afterSelect} bind:sideWidth={sideWidth} Menu={
    [
        {Name: 'main', Component: OutsourcingMain}, 
        {Name: '2022', Component: Outsourcing_2022},
        {Name: '2023', Component: Outsourcing_2023}]}/>
</NavItem>
</div>
<style>
    .OutsourcingSelector{
        width:calc(var(--nav-size) * 0.8);
        height:calc(var(--nav-size) * 0.8);
		background-color: var(--bg);
		border-bottom: var(--border);
		list-style: none;
        float: left;
		display: flex;
		justify-content: flex-end;
        z-index: 1;;
    }
    .side{
        width:100%;
    }
</style>