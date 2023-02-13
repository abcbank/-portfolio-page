<script>
	import { fade } from 'svelte/transition';
    import { Device, ContextVisible, season } from '../../../global'
    import { mdiGithub } from '@mdi/js';
	import NavItem from '../Dropdown/NavItem.svelte';
	import DropdownMenu from '../../Dropdown/DropdownMenu.svelte';
	import IconButton from '../../Dropdown/IconButton.svelte';
    import MenuItem from '../../Dropdown/MenuItem.svelte'
    import jquery from 'jquery'
    import { onMount } from 'svelte'
    import ToggleSwitch from '../../Switch/ToggleSwitch.svelte'

    let SwitchStatus = $ContextVisible;
    let width = 0;
    
    export let height = 0;
    export let isOpen = false;

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

    function  test(){
        return isOpen ? "Select UI" : "";
    }

    onMount(()=>{
    })
</script>
<div class = "Git" style="height:{height}px;" in:fade={{ delay: 100 }}>
<NavItem bind:open={isOpen} isMobile={ $Device["isMobile"] }>
    <span slot="trigger">
        <IconButton path={mdiGithub} Comment="Github" bind:showComment={isOpen} />
    </span>
</NavItem>
</div>
<style>
    .Git{
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