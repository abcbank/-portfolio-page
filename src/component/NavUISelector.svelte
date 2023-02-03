<script>
	import { fade } from 'svelte/transition';
    import { Device, ContextVisible, season } from '../global'
    import { mdiSprout , mdiWaves , mdiSnowflake, mdiLeafMaple,mdiCheckBold,mdiCodeBrackets   } from '@mdi/js';
	import NavItem from './Dropdown/NavItem.svelte';
	import DropdownMenu from './Dropdown/DropdownMenu.svelte';
	import IconButton from './Dropdown/IconButton.svelte';
    import MenuItem from './Dropdown/MenuItem.svelte'
    import jquery from 'jquery'
    import { onMount } from 'svelte'
    import ToggleSwitch from './Switch/ToggleSwitch.svelte'
    import { CardBody } from 'sveltestrap';

    let SwitchStatus = $ContextVisible;
    let width = 0;
    let location = 0;

    let UIStatus = {}
    function SetUIStatus(UIType){
        for(var key in UIStatus) {
            UIStatus[key] = "";
        }
        UIStatus[UIType] = mdiCheckBold;
    }

    function calcLeft(){
        if(document.body.clientWidth <= 767)
            location = document.body.clientWidth / 2 - width / 2;
        else
            location = 11;
    }

    onMount(()=>{
        UIStatus[$season] = mdiCheckBold;
        calcLeft();
    })
</script>
<svelte:window on:resize={calcLeft} />
<div class = "UISelector" bind:clientWidth={width} style="right:{location}px;" in:fade={{ delay: 500 }}>
<NavItem isMobile={ $Device["isMobile"] }>
    <span slot="trigger">
        <IconButton path={mdiCodeBrackets }/>
    </span>
    <DropdownMenu>
        <MenuItem on:click={() => {
            $ContextVisible = !$ContextVisible;
        }} leftIcon={mdiSprout} rightIcon={""}>Context
            <ToggleSwitch bind:checked={$ContextVisible} label="" design="slider" fontSize={12} enableEvent={false}/>
        </MenuItem>
        <MenuItem on:click={() => {
            SetUIStatus("Spring")
            $season = "Spring"
            jquery(".full-landing-image").ripples('pause');
            jquery(".full-landing-image").ripples('hide');
        }} leftIcon={mdiSprout} rightIcon={UIStatus["Spring"]}>Spring</MenuItem>
        <MenuItem on:click={() => {
            SetUIStatus("Summer")
            $season = "Summer"
            jquery(".full-landing-image").ripples('play');
            jquery(".full-landing-image").ripples('show');
        }} leftIcon={mdiWaves} rightIcon={UIStatus["Summer"]}>Summer</MenuItem>
        <MenuItem on:click={() => {
            SetUIStatus("Fall")
            $season = "Fall"
            jquery(".full-landing-image").ripples('pause');
            jquery(".full-landing-image").ripples('hide');
        }}   leftIcon={mdiLeafMaple} rightIcon={UIStatus["Fall"]}>Fall</MenuItem>
        <MenuItem on:click={() => {
            SetUIStatus("Winter")
            $season = "Winter"
            jquery(".full-landing-image").ripples('pause');
            jquery(".full-landing-image").ripples('hide');
        }} leftIcon={mdiSnowflake} rightIcon={UIStatus["Winter"]}>Winter</MenuItem>
    </DropdownMenu>
</NavItem>
</div>
<style>
    .UISelector{
        position:absolute;
        right:11px;
        top:11px;
        width:calc(var(--nav-size) * 0.8);
        height:calc(var(--nav-size) * 0.8);
		background-color: var(--bg);
		border-bottom: var(--border);
		list-style: none;
        float: left;
		display: flex;
		justify-content: flex-end;
        z-index: 1;;
    }
</style>