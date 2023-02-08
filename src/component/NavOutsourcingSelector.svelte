<script>
	import { fade } from 'svelte/transition';
    import { Device, ContextVisible, LastPage } from '../global'
    import { mdiCurrencyKrw,mdiCalendarMonthOutline } from '@mdi/js';
	import NavItem from './Dropdown/NavItem.svelte';
	import DropdownMenu from './Dropdown/DropdownMenu.svelte';
	import IconButton from './Dropdown/IconButton.svelte';
    import MenuItem from './Dropdown/MenuItem.svelte'
    import { onMount } from 'svelte'
    import OutsourcingMain from './DropdownMenus/Outsourcing_Main.svelte';
    import Outsourcing_2022 from './DropdownMenus/Outsourcing_2022.svelte';
    import Outsourcing_2023 from './DropdownMenus/Outsourcing_2023.svelte';

    let SwitchStatus = $ContextVisible;
    let width = 0;
    
    export let height = 0;
    export let isOpen = false;
    export let pushFunc;

    

    function empty(){}

    onMount(()=>{
        if($LastPage["Layer1"] == 'outsourcing')
        {

        }
        
    })
</script>
<div class = "OutsourcingSelector" style="height:{height}px;" in:fade={{ delay: 100 }}>
<NavItem bind:open={isOpen} isMobile={ $Device["isMobile"] }>
    <span slot="trigger" on:click={(event) => pushFunc("/outsourcing")} on:keypress={empty}>
        <IconButton path={mdiCurrencyKrw} Comment="Outsourcing" bind:showComment={isOpen} />
    </span>
    <DropdownMenu Menu={
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
</style>