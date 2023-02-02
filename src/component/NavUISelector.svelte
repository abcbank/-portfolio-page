<script>
	import { fade } from 'svelte/transition';
    import { ContextVisible, season } from '../global'
    import { mdiSprout , mdiWaves , mdiSnowflake, mdiLeafMaple,mdiCheckBold,mdiCodeBrackets   } from '@mdi/js';
	import NavItem from './Dropdown/NavItem.svelte';
	import DropdownMenu from './Dropdown/DropdownMenu.svelte';
	import IconButton from './Dropdown/IconButton.svelte';
    import MenuItem from './Dropdown/MenuItem.svelte'
    import jquery from 'jquery'
    import { onMount } from 'svelte'
    import ToggleSwitch from './Switch/ToggleSwitch.svelte'

    let SwitchStatus = $ContextVisible;

    let UIStatus = {}

    function SetUIStatus(UIType){
        for(var key in UIStatus) {
            UIStatus[key] = "";
        }
        UIStatus[UIType] = mdiCheckBold;
    }
    onMount(()=>{
        UIStatus[$season] = mdiCheckBold;
    })
</script>
<div class = "UISelector" in:fade={{ delay: 500 }}>
<NavItem>
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
        top:11px;
        right:11px;
		height: var(--nav-size);
		background-color: var(--bg);
		padding: 0 1rem;
		border-bottom: var(--border);
        float:left;
		list-style: none;
		margin: 0;
		padding: 0;
		max-width: 100%;
		display: flex;
		justify-content: flex-end;
    }
</style>