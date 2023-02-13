<script>
	import { fade } from 'svelte/transition';
    import { Device } from '../global'
    import { mdiCodeGreaterThanOrEqual  } from '@mdi/js';
	import NavItem from './Dropdown/NavItem.svelte';
	import DropdownMenu from './Dropdown/DropdownMenu.svelte';
	import IconButton from './Dropdown/IconButton.svelte';
    import ProjectsMain from './DropdownMenus/Projects_Main.svelte';
    import Projects_2021 from './DropdownMenus/Projects_2021.svelte';
    import Projects_2022 from './DropdownMenus/Projects_2022.svelte';
    import Projects_2023 from './DropdownMenus/Projects_2023.svelte';
    
    export let height = 0;
    export let isOpen = false;
    export let pushFunc;

    function empty(){}

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