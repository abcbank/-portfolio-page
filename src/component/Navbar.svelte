<script lang="ts">
  import jQuery from 'jquery'
	import { season } from "../global"
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'sveltestrap';
  
  let toggleEnabled = false;
  let isOpen_Project = false;
  let isOpen_Outsourcing = false;

  function handleUpdate(event) {
    if(ProjectMouseup)
      isOpen_Project = event.detail.isOpen;
    if(OutsourcingMouseUp)
      isOpen_Outsourcing = event.detail.isOpen;
  }
  let ProjectMouseup = false;
  let OutsourcingMouseUp = false;
  function ProjectOpenMouseUp(e) {
    ProjectMouseup = true;
  }
  function ProjectOpenMouseOut(e) {
    ProjectMouseup = false;
  }
  function OutsourcingOpenMouseUp(e) {
    OutsourcingMouseUp = true;
  }
  function OutsourcingOpenMouseOut(e) {
    OutsourcingMouseUp = false;
  }

</script>

<div class="NavBar">
  <Navbar color="dark" dark expand="md">
    <NavbarBrand href="/">
      <img class="logo" alt="logo" src="assets/image/icon.png" />
      <span class="logo-text">
        abcBank
      </span>
    </NavbarBrand>
    <NavbarToggler on:click={() => (toggleEnabled = !toggleEnabled)} />
    <Collapse { toggleEnabled } navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <NavItem>
          <NavLink href="#components/">About Me</NavLink>
        </NavItem>
        
        <Dropdown nav inNavbar>
          <DropdownToggle nav class="nav-link" caret on:mouseover={ProjectOpenMouseUp} on:mouseout={ProjectOpenMouseOut}>Projects</DropdownToggle>
          <DropdownMenu color="dark" dark right>
            <DropdownItem>2022</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>2023</DropdownItem>
            <!-- <DropdownItem divider />
            <DropdownItem>Reset</DropdownItem> -->
          </DropdownMenu>
        </Dropdown>

        <Dropdown nav inNavbar>
          <DropdownToggle nav class="nav-link" caret on:mouseover={OutsourcingOpenMouseUp} on:mouseout={OutsourcingOpenMouseOut}>Outsourcing</DropdownToggle>
          <DropdownMenu  right>
            <DropdownItem>2022</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>2023</DropdownItem>
            <!-- <DropdownItem divider />
            <DropdownItem>Reset</DropdownItem> -->
          </DropdownMenu>
        </Dropdown>
        
        <NavItem>
          <NavLink href="https://github.com/abcbank">GitHub</NavLink>
        </NavItem>
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
  .logo {
    width:30px; 
    height:30px;
  }
  .logo-text{
    padding-left:10px;
  }
</style>