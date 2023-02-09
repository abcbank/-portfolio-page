<script>
    import { LastPage,season } from '../../global'
    import { mdiPackageVariantClosed , mdiDownloadOutline, mdiPackage , mdiPiano, mdiArrowLeft, mdiCircleOutline,mdiCircleSlice1,mdiCircleSlice2,mdiCircleSlice3,mdiCircleSlice4,mdiCircleSlice5,mdiCircleSlice6,mdiCircleSlice7,mdiCircleSlice8    } from '@mdi/js';
    import MenuItem from '../Dropdown/MenuItem.svelte'
	import MenuFrame from '../Dropdown/DefaultMenu.svelte';
    import { push } from "svelte-spa-router";
    import { onMount } from 'svelte'
    
    export let height;
    export let activeMenu;

    let isChecked = {};
    let config = [
        {path: mdiCircleOutline, color: "currentcolor"},
        {path: mdiCircleSlice1 , color: "currentcolor"},
        {path: mdiCircleSlice2 , color: "currentcolor"},
        {path: mdiCircleSlice3 , color: "currentcolor"},
        {path: mdiCircleSlice4 , color: "currentcolor"},
        {path: mdiCircleSlice5 , color: "currentcolor"},
        {path: mdiCircleSlice6 , color: "currentcolor"},
        {path: mdiCircleSlice7 , color: "currentcolor"},
        {path: mdiCircleSlice8 , color: "currentcolor"},
        {path: mdiCircleSlice7 , color: "currentcolor"},
        {path: mdiCircleSlice6 , color: "currentcolor"},
        {path: mdiCircleSlice5 , color: "currentcolor"},
        {path: mdiCircleSlice4 , color: "currentcolor"},
        {path: mdiCircleSlice3 , color: "currentcolor"},
        {path: mdiCircleSlice2 , color: "currentcolor"},
        {path: mdiCircleSlice1 , color: "currentcolor"}
    ]
    let idx = 0;
    let t;
    
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

    function moveNext(){
        clearTimeout(t);
        t = setTimeout(() => {
            idx = (idx + 1) % config.length;
            moveNext();
        }, 200)
    }

  onMount(() => {
    rerandering();
    moveNext();
  })
</script>

<MenuFrame bind:height={height} in_x={300} out_x={300}>
    <MenuItem on:click={() => {
        activeMenu = "main"
    }}  leftIcon={mdiArrowLeft} isChecked={false} >Back</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2022/analoguecalibration")
        rerandering();
    }}  bind:leftIcon={config[idx].path} bind:leftIconColor={config[idx].color} bind:isChecked={isChecked["analoguecalibration"]} >아날로그 캘리브레이션</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2022/robotpiano")
        rerandering();
    }}   leftIcon={mdiPiano} bind:isChecked={isChecked["robotpiano"]}>로봇 피아노</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2022/visionpickup")
        rerandering();
    }}   leftIcon={mdiPackage } bind:isChecked={isChecked["visionpickup"]}>상자 픽업</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2022/downloader")
        rerandering();
    }}   leftIcon={mdiDownloadOutline} bind:isChecked={isChecked["downloader"]}>PCB 다운로더 리뉴얼</MenuItem>
    <MenuItem on:click={() => {
        pushRouter("/project/2022/convyerboxing")
        rerandering();
    }}   leftIcon={mdiPackageVariantClosed } bind:isChecked={isChecked["convyerboxing"]}>박스 포장</MenuItem>
</MenuFrame>