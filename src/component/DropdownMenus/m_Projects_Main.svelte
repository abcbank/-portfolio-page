<script>
    import { season } from '../../global'
    import { mdiCalendarMonthOutline, mdiChevronRight   } from '@mdi/js';
    import MenuItem from '../Sidebar/Dropdown/MenuItem.svelte'
	import MenuFrame from '../Sidebar/Dropdown/DefaultMenu.svelte';
    import { onMount } from 'svelte'
    
    export let height;
    export let activeMenu;
</script>

<MenuFrame bind:height={height}>
    <MenuItem on:click={() => {
        activeMenu = "2021"
    }}  leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >2021</MenuItem>
    <MenuItem on:click={() => {
        activeMenu = "2022"
    }}  leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >2022</MenuItem>
    <MenuItem on:click={() => {
        activeMenu = "2023"
    }}   leftIcon={mdiCalendarMonthOutline} rightIcon={mdiChevronRight } isChecked={false} >2023</MenuItem>
</MenuFrame>