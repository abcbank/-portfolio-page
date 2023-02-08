<script>
	import { fade } from 'svelte/transition';
    import { Device, ContextVisible, season } from '../global'
    import { mdiCodeGreaterThanOrEqual,mdiCalendarMonthOutline  } from '@mdi/js';
	import NavItem from './Dropdown/NavItem.svelte';
	import DropdownMenu from './Dropdown/DropdownMenu.svelte';
	import IconButton from './Dropdown/IconButton.svelte';
    import MenuItem from './Dropdown/MenuItem.svelte'
    import jquery from 'jquery'
    import { onMount } from 'svelte'
    import ToggleSwitch from './Switch/ToggleSwitch.svelte'
    import ProjectsMain from './DropdownMenus/Projects_Main.svelte';
    import Projects_2021 from './DropdownMenus/Projects_2021.svelte';
    import Projects_2022 from './DropdownMenus/Projects_2022.svelte';
    import Projects_2023 from './DropdownMenus/Projects_2023.svelte';

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
<div class = "Project" style="height:{height}px;" in:fade={{ delay: 100 }}>
<NavItem bind:open={isOpen} isMobile={ $Device["isMobile"] }>
    <span slot="trigger" on:click={(event) => pushFunc("/projects")} on:keypress={empty}>
        <IconButton path={mdiCodeGreaterThanOrEqual} Comment="Project" bind:showComment={isOpen} />
    </span>
    <DropdownMenu Menu={
    [
        {Name: 'main', Component: ProjectsMain}, 
        {Name: '2021', Component: Projects_2021},
        {Name: '2022', Component: Projects_2022},
        {Name: '2023', Component: Projects_2023}]}/>
    <!-- <DropdownMenu>
        <MenuItem on:click={() => {

        }}  leftIcon={mdiCalendarMonthOutline}>2021</MenuItem>
        <MenuItem on:click={() => {

        }}  leftIcon={mdiCalendarMonthOutline}>2022</MenuItem>
        <MenuItem on:click={() => {

        }}   leftIcon={mdiCalendarMonthOutline}>2023</MenuItem>
    </DropdownMenu> -->
</NavItem>
</div>
<style>
    .Project{
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