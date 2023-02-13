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
  import NavLogo from "./Components/Navlogo.svelte"
  import Profile from "./Components/NavProfile.svelte"
  import Git from "./Components/NavGithub.svelte"  
  import Outsourcing from "./Components/NavOutsourcingSelector.svelte"
  import Project from "./Components/NavProjectSelector.svelte"
  import NavUISelector from "./Components/NavUISelector.svelte"  

  import { push } from "svelte-spa-router";
  import { LastPage } from '../../global'
  import { onMount } from 'svelte'
	import IconButton from '../Dropdown/IconButton.svelte';
  import Toggler from "../Sidebar/Toggler.svelte"
  import Sidebar from '../Sidebar/Sidebar.svelte'

  export let height;

  let isOpen = false;
  let isOpen_pre = false;


  let Profile_isOpen = false;
  let Project_isOpen = false;
  let Outsourcing_isOpen = false;
  let Git_isOpen = false;
  let NavUISelector_isOpen = false;

  let width;

  function pushRouter(link){
        link = link.toLowerCase();
        var layers = link.split('/')
    for(let i = 0; i < layers.length; i++){
      $LastPage["Layer" + i.toString()] = layers[i];
    }

    push(link);
  }

  function onClose(){
    Profile_isOpen = false;
    Project_isOpen = false;
    Outsourcing_isOpen = false;
    Git_isOpen = false;
    NavUISelector_isOpen = false;
  }
  function onOpen(){
    Profile_isOpen = false;
    Project_isOpen = false;
    Outsourcing_isOpen = false;
    Git_isOpen = false;
    NavUISelector_isOpen = false;
  }

let sidebarIsOpen = false;
  onMount(()=>{
  })
</script>

<div class="NavBar"
bind:clientHeight={height} bind:clientWidth={width}>
  <div style="left:11px;" on:click={() => {pushRouter("/")}} on:keypress={()=>{}}>
    <NavLogo />
  </div>
  <div style="float:right;">
    {#if width <= 720}
    <Sidebar bind:open={sidebarIsOpen} onClose={onClose}>
      <Profile height = { height } isSide={true} onOpen={onOpen} pushFunc={pushRouter} bind:isOpen={Profile_isOpen}  />
      <Project height = { height } isSide={true} onOpen={onOpen} pushFunc={pushRouter} bind:isOpen={Project_isOpen}  />
      <Outsourcing height = { height } isSide={true} onOpen={onOpen} pushFunc={pushRouter}  bind:isOpen={Outsourcing_isOpen}  />
      <Git height = { height } isSide={true} onOpen={onOpen} bind:isOpen={Git_isOpen} />
      <NavUISelector height= { height } isSide={true} onOpen={onOpen} bind:isOpen={NavUISelector_isOpen} />
    </Sidebar>
    {:else}
    <Profile height = { height - 22} onOpen={onOpen} pushFunc={pushRouter}  bind:isOpen={Profile_isOpen}/>
    <Project height = { height - 22} onOpen={onOpen} pushFunc={pushRouter} bind:isOpen={Project_isOpen}  />
    <Outsourcing height = { height - 22} onOpen={onOpen} pushFunc={pushRouter} bind:isOpen={Outsourcing_isOpen}   />
    <Git height = { height - 22} onOpen={onOpen} bind:isOpen={Git_isOpen}/>
    <NavUISelector height= { height - 22} onOpen={onOpen} bind:isOpen={NavUISelector_isOpen}/>
    {/if}
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