<script>
	import { fade } from 'svelte/transition';
    import { Device, ContextVisible, season } from '../../../global'
    import { mdiCodeBrackets    } from '@mdi/js';
	import NavItem from '../../Dropdown/NavItem.svelte';
	import DropdownMenu from '../../Dropdown/DropdownMenu.svelte';
	import IconButton from '../../Dropdown/IconButton.svelte';
    import UiSelect from '../../DropdownMenus/UISelect.svelte';

    let SwitchStatus = $ContextVisible;
    let width = 0;
    let isChecked = {
        "Spring" :false,
        "Summer" :false,
        "Fall" :false,
        "Winter" :false
    }

    export let height = 0;
    export let isOpen = false;

    function rerandering(){
        for(let i in isChecked){
            console.log(i)
            console.log($season)
            console.log(i == $season)
            if(i == $season)
                isChecked[i] = true;
            else
                isChecked[i] = false;
        }
    }

</script>
<div class = "UISelector" style="height:{height}px;" in:fade={{ delay: 100 }}>
    <NavItem bind:open={isOpen} isMobile={ $Device["isMobile"] }>
        <span slot="trigger">
            <IconButton path={mdiCodeBrackets} Comment="Select UI" bind:showComment={isOpen} />
        </span>
        <DropdownMenu Menu={[{Name: 'main', Component: UiSelect}]}/>
    </NavItem>
</div>
<style>
    .UISelector{
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