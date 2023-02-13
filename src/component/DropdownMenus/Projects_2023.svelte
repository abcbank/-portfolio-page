<script>
    import { LastPage,season } from '../../global'
    import { mdiApplicationOutline, mdiPoll, mdiBarrelOutline , mdiArrowLeft, mdiCalendarMonthOutline, mdiChevronRight   } from '@mdi/js';
    import MenuItem from '../Dropdown/MenuItem.svelte'
	import MenuFrame from '../Dropdown/DefaultMenu.svelte';
    import { push } from "svelte-spa-router";
    import { onMount } from 'svelte'
    
    export let height;
    export let activeMenu;
    export let Side;

    let isChecked = {};
    
    function rerandering(){
        for(var i in isChecked)
            isChecked[i] = false;
        isChecked[$LastPage["Layer3"]] = true;
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

<MenuFrame bind:height={height} in_x={Side ? -300 : 300} out_x={Side ? -300 : 300}>
    <MenuItem on:click={() => {
        activeMenu = "main"
    }}  leftIcon={mdiArrowLeft} isChecked={false} >Back</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2023/cutlet")
        rerandering();
    }}  leftIcon={mdiBarrelOutline } bind:isChecked={isChecked["cutlet"]} >돈가스 튀김</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2023/digitalcalibration")
        rerandering();
    }}   leftIcon={mdiPoll} bind:isChecked={isChecked["digitalcalibration"]}>디지털 캘리브레이션 정비</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2023/portfoliopage")
        rerandering();
    }}   leftIcon={mdiApplicationOutline } bind:isChecked={isChecked["portfoliopage"]}>포트폴리오 페이지</MenuItem>
</MenuFrame>