<script>
	import { fade } from 'svelte/transition';
    import { Device, ContextVisible, season } from '../../../global'
    import { mdiCodeBrackets,mdiChevronDown    } from '@mdi/js';
	import NavItem from '../../Dropdown/NavItem.svelte';
	import DropdownMenu from '../../Dropdown/DropdownMenu.svelte';
	import IconButton from '../../Dropdown/IconButton.svelte';
    import UiSelect from '../../DropdownMenus/UISelect.svelte';
    import SideTrigger from '../../Dropdown/SideTrigger.svelte';

    let SwitchStatus = $ContextVisible;
    let width = 0;
    let isChecked = {
        "Spring" :false,
        "Summer" :false,
        "Fall" :false,
        "Winter" :false
    }

    export let height = 0;
    export let onOpen;
    export let isSide = false;
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
<div class = "UISelector"class:side={isSide} style="height:{height}px;" in:fade={{ delay: 100 }}>
    <NavItem bind:open={isOpen} Side={ isSide }  preOpen={onOpen}>
        <span slot="trigger">
            {#if !isSide}
            <IconButton path={mdiCodeBrackets} Comment="Select UI" bind:showComment={isOpen} />
            {:else}
            <SideTrigger leftIcon={mdiCodeBrackets} bind:isOpen={isOpen} isDropdown={true} rightIconColor="#fff" textColor="#fff" >Select UI</SideTrigger>
            {/if}
        </span>
        <DropdownMenu Side={isSide} Menu={[{Name: 'main', Component: UiSelect}]}/>
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
    .side{
        width:100%;
    }
</style>