<script>
  import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'sveltestrap';
  import NavLogo from "./Navlogo.svelte"
  import Profile from "./NavProfile.svelte"
  import Git from "./NavGithub.svelte"  
  import Outsourcing from "./NavOutsourcingSelector.svelte"
  import Project from "./NavProjectSelector.svelte"
  import NavUISelector from "./NavUISelector.svelte"  
  import { push } from "svelte-spa-router";
  import { LastPage } from '../global'
  import { onMount } from 'svelte'
	import IconButton from './Dropdown/IconButton.svelte';
  
  export let height;

  let isOpen = false;
  let isOpen_pre = false;

  let uiSelectorLocation = 11;

  let Profile_isOpen = false;
  let Project_isOpen = false;
  let Outsourcing_isOpen = false;
  let Git_isOpen = false;
  let NavUISelector_isOpen = false;

  function pushRouter(link){
        link = link.toLowerCase();
        var layers = link.split('/')
    for(let i = 0; i < layers.length; i++){
      $LastPage["Layer" + i.toString()] = layers[i];
    }

    push(link);
  }

function calcLeft(){
    if(document.body.clientWidth <= 767)
    {
      uiSelectorLocation = 60;
    }
    else
      uiSelectorLocation = 11;
}
  onMount(()=>{
    calcLeft();
  })
</script>


<div class="NavBar"
bind:clientHeight={height}>
  <div style="left:11px;" on:click={() => {pushRouter("/")}} on:keypress={()=>{}}>
    <NavLogo pushFunc={pushRouter} />
  </div>
  <div style="float:right;">
    <Profile height = { height - 22} bind:isOpen={Profile_isOpen} pushFunc={pushRouter} />
    <Project height = { height - 22} bind:isOpen={Project_isOpen} pushFunc={pushRouter} />
    <Outsourcing height = { height - 22} bind:isOpen={Outsourcing_isOpen} pushFunc={pushRouter}  />
    <Git height = { height - 22}  bind:isOpen={Git_isOpen}/>
    <NavUISelector height= { height - 22} bind:isOpen={NavUISelector_isOpen}/>
  </div>
</div>

<style>
  .NavBar{
    background-color:#282a35;
    position:absolute;
    padding:11px;
    height:60px;
    top:0%;
    width:100%;
    z-index:9999;
    opacity:0.6;
    transition: opacity 0.3s ease;
  }
  .NavBar:hover{
    opacity:0.8
  }
  .item{
        position:absolute;
        top:11px;
  }
</style>