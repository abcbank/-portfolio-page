<script>
    import { LastPage,season } from '../../global'
    import { mdiArrowLeft, mdiDownloadOutline, mdiWeb, mdiCctv,mdiPiano,mdiBarcodeScan, mdiCar } from '@mdi/js';
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
        for(var i in isChecked)
            isChecked[i] = false;
        if($LastPage["Layer2"] == "2021"){
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

<MenuFrame bind:height={height} in_x={Side ? -300 : 300} out_x={Side ? -300 : 300}>
    <MenuItem on:click={() => {
        activeMenu = "main"
    }}  leftIcon={mdiArrowLeft} isChecked={false} >Back</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2021/downloader")
        rerandering();
        afterSelect();
    }}  leftIcon={mdiDownloadOutline} bind:isChecked={isChecked["downloader"]} >PCB 다운로더</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2021/cafe24")
        rerandering();
        afterSelect();
    }}   leftIcon={mdiWeb} bind:isChecked={isChecked["cafe24"]}>Cafe24 리뉴얼</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2021/convyervision")
        rerandering();
        afterSelect();
    }}   leftIcon={mdiCctv } bind:isChecked={isChecked["convyervision"]}>컨베이어 비전</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2021/sunloop")
        rerandering();
        afterSelect();
    }}   leftIcon={mdiCar } bind:isChecked={isChecked["sunloop"]}>썬루프 비전</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2021/robotpiano")
        rerandering();
        afterSelect();
    }}   leftIcon={mdiPiano } bind:isChecked={isChecked["robotpiano"]}>로봇 피아노</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2021/barcode")
        rerandering();
        afterSelect();
    }}   leftIcon={mdiBarcodeScan } bind:isChecked={isChecked["barcode"]}>바코드 리더</MenuItem>
</MenuFrame>