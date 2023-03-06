<script>
    import { LastPage,season } from '../../global'
    import { mdiApplicationOutline, mdiPoll, mdiBarrelOutline , mdiArrowLeft, mdiCalendarMonthOutline, mdiChevronRight   } from '@mdi/js';
    import MenuItem from '../Dropdown/MenuItem.svelte'
	import MenuFrame from '../Dropdown/DefaultMenu.svelte';
    import { push } from "svelte-spa-router";
    import { onMount } from 'svelte'
    
    export let height;
    export let afterSelect;
    export let width;
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

<MenuFrame bind:height={height} bind:width={width} in_x={Side ? -300 : 300} out_x={Side ? -300 : 300}>
    <MenuItem on:click={() => {
        activeMenu = "main"
    }}  leftIcon={mdiArrowLeft} isChecked={false} >Back</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2023/cutlet")
        rerandering();
        afterSelect();
    }}  leftIcon={mdiBarrelOutline } bind:isChecked={isChecked["cutlet"]} >돈가스 튀김</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2023/digitalcalibration")
        rerandering();
        afterSelect();
    }}   leftIcon={mdiPoll} bind:isChecked={isChecked["digitalcalibration"]}>
        {#if width < 200}
        디지털<br/>캘리브레이션
        {:else}
        디지털 캘리브레이션
        {/if}
</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2023/portfoliopage")
        rerandering();
        afterSelect();
    }}   leftIcon={mdiApplicationOutline } bind:isChecked={isChecked["portfoliopage"]}>포트폴리오 페이지</MenuItem>
</MenuFrame>