<script>
	import { fade } from 'svelte/transition';
    import { Device, ContextVisible, season } from '../../../global'
    import { mdiAccountBox } from '@mdi/js';
	import NavItem from '../../Dropdown/NavItem.svelte';
	import DropdownMenu from '../../Dropdown/DropdownMenu.svelte';
	import IconButton from '../../Dropdown/IconButton.svelte';
    import MenuItem from '../../Dropdown/MenuItem.svelte'
    import jquery from 'jquery'
    import { onMount } from 'svelte'
    import ToggleSwitch from './Switch/ToggleSwitch.svelte'

    let SwitchStatus = $ContextVisible;
    let width = 0;
    
    export let height = 0;
    export let isOpen = false;
    export let pushFunc;

    let UIStatus = {}

    function SetUIStatus(UIType){
        for(var key in UIStatus) {
            UIStatus[key] = "";
        }
        UIStatus[UIType] = mdiCheckBold;
        // if( $Device["isMobile"] ){
        //     isOpen = false;
        // }
    }
    function empty(){}

    onMount(()=>{
    })
</script>
<div class = "Profile" style="height:{height}px;" in:fade={{ delay: 100 }}>
<NavItem bind:open={isOpen} isMobile={ $Device["isMobile"] }>
    <span slot="trigger" on:click={(event) => pushFunc("/profile")} on:keypress={empty}>
        <IconButton path={mdiAccountBox} Comment="Profile" bind:showComment={isOpen} />
    </span>
</NavItem>
</div>
<style>
    .Profile{
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