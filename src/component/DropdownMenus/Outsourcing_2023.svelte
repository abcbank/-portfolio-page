<script>
    import { LastPage,season } from '../../global'
    import { mdiArrowLeft, mdiCalendarMonthOutline, mdiChevronRight   } from '@mdi/js';
    import MenuItem from '../Dropdown/MenuItem.svelte'
	import MenuFrame from '../Dropdown/DefaultMenu.svelte';
    import { push } from "svelte-spa-router";
    import { onMount } from 'svelte'
    
    export let height;
    export let afterSelect;
    export let activeMenu;
    export let Side;

    let isChecked = {};
    
    function rerandering(){
        if($LastPage["Layer2"] == "2023"){
            for(var i in isChecked)
                isChecked[i] = false;
            isChecked[$LastPage["Layer3"]] = true;
        }
    }
    function pushRouter(link){
        link = link.toLowerCase();
        var layers = link.split('/')
        for(let i = 0; i < layers.length; i++){
        $LastPage["Layer" + i.toString()] = layers[i];
        }
        push(link);
    }

  onMount(() => {
    rerandering();
  })
</script>

<MenuFrame bind:height={height}  in_x={Side ? -300 : 300} out_x={Side ? -300 : 300}>
    <MenuItem on:click={() => {
        activeMenu = "main"
    }}  leftIcon={mdiArrowLeft} isChecked={false} >Back</MenuItem>
</MenuFrame>