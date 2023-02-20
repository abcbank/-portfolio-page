<script>
	import MenuItem from '../Dropdown/MenuItem.svelte';
	import MenuFrame from '../Dropdown/DefaultMenu.svelte';
    import { ContextVisible, season } from '../../global'
    import { mdiSprout , mdiWaves , mdiSnowflake, mdiLeafMaple, mdiTextBoxRemoveOutline    } from '@mdi/js';
    import jquery from 'jquery'
    import ToggleSwitch from '../Switch/ToggleSwitch.svelte'
    import { onMount } from 'svelte'
    
    export let height;
    export let afterSelect;
    export let Side;

    let isChecked = {
        "Spring" :false,
        "Summer" :false,
        "Fall" :false,
        "Winter" :false
    }

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
    onMount(()=>{
        isChecked[$season] = true;
    })
</script>

<MenuFrame bind:height={height}  in_x={Side ? 300 : -300} out_x={Side ? 300 : -300}>
    <MenuItem on:click={() => {
        $ContextVisible = !$ContextVisible;
    }} leftIcon={mdiTextBoxRemoveOutline } isChecked={false} >Context
        <ToggleSwitch bind:checked={$ContextVisible} label="" design="slider" fontSize={12} enableEvent={false}/>
    </MenuItem>
    <MenuItem on:click={() => {
        $season = "Spring"
        rerandering();
        jquery(".full-landing-image").ripples('pause');
        jquery(".full-landing-image").ripples('hide');
        afterSelect();
    }} leftIcon={mdiSprout} isChecked={isChecked["Spring"]}>Spring</MenuItem>
    <MenuItem on:click={() => {
        $season = "Summer"
        rerandering();
        jquery(".full-landing-image").ripples('play');
        jquery(".full-landing-image").ripples('show');
        afterSelect();
    }} leftIcon={mdiWaves} isChecked={isChecked["Summer"]}>Summer</MenuItem>
    <MenuItem on:click={() => {
        $season = "Fall"
        rerandering();
        jquery(".full-landing-image").ripples('pause');
        jquery(".full-landing-image").ripples('hide');
        afterSelect();
    }}   leftIcon={mdiLeafMaple} isChecked={isChecked["Fall"]}>Fall</MenuItem>
    <MenuItem on:click={() => {
        $season = "Winter"
        rerandering();
        jquery(".full-landing-image").ripples('pause');
        jquery(".full-landing-image").ripples('hide');
        afterSelect();
    }} leftIcon={mdiSnowflake} isChecked={isChecked["Winter"]}>Winter</MenuItem>
</MenuFrame>