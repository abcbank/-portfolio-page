<script>
    import { season } from '../../global'
    import { mdiArrowLeft, mdiCalendarMonthOutline, mdiChevronRight   } from '@mdi/js';
    import MenuItem from '../Dropdown/MenuItem.svelte'
	import MenuFrame from '../Dropdown/DefaultMenu.svelte';
    import { onMount } from 'svelte'
    
    export let height;
    export let activeMenu;
</script>

<MenuFrame bind:height={height} in_x={300} out_x={300}>
    <MenuItem on:click={() => {
        activeMenu = "main"
    }}  leftIcon={mdiArrowLeft} isChecked={false} >Back</MenuItem>
    <MenuItem on:click={() => {
    }}  leftIcon={mdiCalendarMonthOutline} isChecked={false} >A</MenuItem>
    <MenuItem on:click={() => {
    }}   leftIcon={mdiCalendarMonthOutline} isChecked={false} >B</MenuItem>
</MenuFrame>