<script>
  import jQuery from 'jquery'
	import { season } from "../global"
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'sveltestrap';
  import NavLogo from "./Navlogo.svelte"
  
  let toggleEnabled = false;
  let isOpen_Project = false;
  let isOpen_Outsourcing = false;

  let size = [1,1,1,1]

  function handleUpdate(event) {
    if(ProjectMouseup)
      isOpen_Project = event.detail.isOpen;
    if(OutsourcingMouseUp)
      isOpen_Outsourcing = event.detail.isOpen;
  }
  let ProjectMouseup;
  let OutsourcingMouseUp;
  let Project;
  let Outsourcing;
  function ProjectOpenMouseUp(e) {
    document.getElementById("ProjectMenu").classList.toggle("Show");
    size[1] = 1.2
  }
  function ProjectOpenMouseOut(e) {
    ProjectMouseup = false;
    size [1]= 1
  }
  function OutsourcingOpenMouseUp(e) {
    OutsourcingMouseUp = true;
    size[2] = 1.2
  }
  function OutsourcingOpenMouseOut(e) {
    OutsourcingMouseUp = false;
    size[2] = 1.0
  }
</script>

<div class="NavBar">
  <Navbar color="dark" dark expand="md">
    <NavLogo />
    <NavbarToggler on:click={() => (toggleEnabled = !toggleEnabled)} />
    <Collapse { toggleEnabled } navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <div class="Items">
          <NavItem>
            <NavLink href="#/Profile">Profile</NavLink>
          </NavItem>
        </div>
        <div class="Items" on:mouseover={ProjectOpenMouseUp} on:mouseout={ProjectOpenMouseOut} on:focus={() => {}} on:blur={() => {}}  style="transform: scale({size[1]});">
          <Dropdown nav inNavbar>
            <DropdownToggle nav class="nav-link" caret>Projects</DropdownToggle>
            <DropdownMenu  right>
              <DropdownItem href="#/2021/Projects">2021</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#/2022/Projects">2022</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#/2023/Projects">2023</DropdownItem>
              <!-- <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem> -->
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="Items" on:mouseover={OutsourcingOpenMouseUp} on:mouseout={OutsourcingOpenMouseOut} on:focus={() => {}} on:blur={() => {}}  style="transform: scale({size[2]});">
          <Dropdown nav inNavbar>
            <DropdownToggle nav class="nav-link" caret on:mouseover={OutsourcingOpenMouseUp} on:mouseout={OutsourcingOpenMouseOut}>Outsourcing</DropdownToggle>
            <DropdownMenu  right>
              <DropdownItem href="#/2022/Outsourcing">2022</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#/2023/Outsourcing">2023</DropdownItem>
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
    
      <div style="float:left;">
        <Dropdown>
          <DropdownToggle caret> { $season }</DropdownToggle>
          <DropdownMenu>
            <DropdownItem on:click={() => 
            {
              $season = "Spring"
              jQuery(".full-landing-image").ripples('pause');
              jQuery(".full-landing-image").ripples('hide');
            }}>Spring</DropdownItem>
            <DropdownItem on:click={() => 
            {
              $season = "Summer"
              jQuery(".full-landing-image").ripples('play');
              jQuery(".full-landing-image").ripples('show');
            }}>Summer</DropdownItem>
            
            <DropdownItem on:click={() => 
            {
              $season = "Fall"
              jQuery(".full-landing-image").ripples('pause');
              jQuery(".full-landing-image").ripples('hide');
            }}>Fall</DropdownItem>
            
            <DropdownItem on:click={() => 
            {
              $season = "Winter"
              jQuery(".full-landing-image").ripples('pause');
              jQuery(".full-landing-image").ripples('hide');
            }}>Winter</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
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
    transition: all  0.1s ease-in-out;
  }
  .NavBar .Items:hover{
    transform: scale(1.2);
  }
  
</style>