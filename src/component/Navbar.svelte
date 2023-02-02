<script>
  import jquery from 'jquery'
	import { season } from "../global"
  import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'sveltestrap';
  import NavLogo from "./Navlogo.svelte"
  import NavUISelector from "./NavUISelector.svelte"  
  import { push } from "svelte-spa-router";
  
  export let height;

  let isOpen = false;
  let isOpen_pre = false;

  let t;
  let t_1;
  let t_2;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
  let ProjectOpen;
  let OutsourcingOpen;
  let ProjectOpen_pre;
  let OutsourcingOpen_pre;

  function ProjectOpenMouseUp(e) {
    ProjectOpen_pre = true;
    clearTimeout(t_1)
    t_1 = setTimeout(() => {
        ProjectOpen = ProjectOpen_pre;
    }, 100)
  }
  function ProjectOpenMouseOut(e) {
    ProjectOpen_pre = false;
    clearTimeout(t_1)
    t_1 = setTimeout(() => {
        ProjectOpen = ProjectOpen_pre;
    }, 100)
  }
  function OutsourcingOpenMouseUp(e) {
    OutsourcingOpen_pre = true;
    clearTimeout(t_2)
    t_2 = setTimeout(() => {
      OutsourcingOpen = OutsourcingOpen_pre;
    }, 100)
  }
  function OutsourcingOpenMouseOut(e) {
    OutsourcingOpen_pre = false;
    clearTimeout(t_2)
    t_2 = setTimeout(() => {
      OutsourcingOpen = OutsourcingOpen_pre;
    }, 100)
  }
  function closeCollapse(){
    isOpen_pre = false;
    clearTimeout(t)
    t = setTimeout(() => {
        isOpen = isOpen_pre;
    }, 300)
  }
  function openCollapse(){
    isOpen_pre = true;
    clearTimeout(t)
    t = setTimeout(() => {
        isOpen = isOpen_pre;
    }, 300)
  }
</script>

<div class="NavBar"
bind:clientHeight={height}
on:mouseenter|preventDefault={() => {openCollapse()}} 
on:mouseleave|preventDefault={() => {closeCollapse()}}>
  <Navbar color="dark" dark expand="md">
    <div on:click={()=> {isOpen = false;}} on:keydown={() => {}}>
      <NavLogo />
    </div>
    <Collapse { isOpen } navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <div class="Items">
          <NavItem>
            <NavLink on:click={()=> {isOpen = false; push("/Profile");}}>Profile</NavLink>
          </NavItem>
        </div>
        <div class="Items" on:mouseenter={ProjectOpenMouseUp} on:mouseleave={ProjectOpenMouseOut}>
          <Dropdown isOpen={ ProjectOpen } nav inNavbar>
            <DropdownToggle nav class="nav-link" caret on:click={() => {isOpen = false; push("/Projects");}}>Projects</DropdownToggle>
            <DropdownMenu>
              <DropdownItem on:click={()=> {isOpen = false; push("/2021/Projects");}}>2021</DropdownItem>
              <DropdownItem divider />
              <DropdownItem  on:click={()=> {isOpen = false; push("/2022/Projects");}}>2022</DropdownItem>
              <DropdownItem divider />
              <DropdownItem  on:click={()=> {isOpen = false; push("/2023/Projects");}}>2023</DropdownItem>
              <!-- <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem> -->
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="Items" on:mouseenter={OutsourcingOpenMouseUp} on:mouseleave={OutsourcingOpenMouseOut}>
          <Dropdown isOpen={ OutsourcingOpen } nav inNavbar>
            <DropdownToggle nav class="nav-link" caret on:click={() => {isOpen = false; push("/Outsourcing");}}>Outsourcing</DropdownToggle>
            <DropdownMenu>
              <DropdownItem  on:click={()=> {isOpen = false; push("/2022/Outsourcing");}}>2022</DropdownItem>
              <DropdownItem divider />
              <DropdownItem on:click={()=> {isOpen = false; push("/2023/Outsourcing");}}>2023</DropdownItem>
              <!-- <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem> -->
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="Items">
          <NavItem>
            <NavLink href="https://github.com/abcbank">GitHub</NavLink>
          </NavItem>
        </div>
        
      </Nav>
    </Collapse>
    <NavUISelector />
  </Navbar>
</div>

<style>
  .NavBar{
    position:absolute;
    background-color: transparent;
    top:0%;
    width:100%;
    z-index:9999;
    opacity:0.6;
    transition: opacity 0.3s ease
  }
  .NavBar:hover{
    opacity:0.8
  }

  .NavBar .Items{
    transition: all  0.2s ease-in-out;
  }
  .NavBar .Items:hover{
    transform: scale(1.2);
  }
  
</style>