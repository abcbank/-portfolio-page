<script>
    import { season } from '../../global'
    import { mdiCalendarMonthOutline, mdiChevronRight   } from '@mdi/js';
    import MenuItem from '../Dropdown/MenuItem.svelte'
	import MenuFrame from '../Dropdown/DefaultMenu.svelte';
    import { onMount } from 'svelte'
    
    export let height;
    export let afterSelect;
    export let activeMenu;
    export let Side;
</script>

<MenuFrame bind:height={height}  in_x={Side ? 300 : -300} out_x={Side ? 300 : -300}>
    <MenuItem on:click={() => {
        activeMenu = "2022"
    }}  leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >2022</MenuItem>
    <MenuItem on:click={() => {
        activeMenu = "2023"
    }}   leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >2023</MenuItem>
</MenuFrame>