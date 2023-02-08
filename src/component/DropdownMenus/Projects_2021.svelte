<script>
    import { LastPage,season } from '../../global'
    import { mdiArrowLeft, mdiCalendarMonthOutline } from '@mdi/js';
    import MenuItem from '../Dropdown/MenuItem.svelte'
	import MenuFrame from '../Dropdown/DefaultMenu.svelte';
    import { push } from "svelte-spa-router";
    import { onMount } from 'svelte'
    
    export let height;
    export let activeMenu;

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

<MenuFrame bind:height={height} in_x={300} out_x={300}>
    <MenuItem on:click={() => {
        activeMenu = "main"
    }}  leftIcon={mdiArrowLeft} isChecked={false} >Back</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2021/downloader")
        rerandering();
    }}  leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["downloader"]} >다운로더 / 인스펙터</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2021/cafe24")
        rerandering();
    }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["cafe24"]}>Cafe24 리뉴얼</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2021/convyervision")
        rerandering();
    }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["convyervision"]}>Convyer Vision</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2021/robotpiano")
        rerandering();
    }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["robotpiano"]}>Robot Piano</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2021/barcode")
        rerandering();
    }}   leftIcon={mdiCalendarMonthOutline} bind:isChecked={isChecked["barcode"]}>바코드 리더</MenuItem>
</MenuFrame>