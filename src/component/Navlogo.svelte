<script>
    import { NavbarBrand } from 'sveltestrap';
    import { spring } from 'svelte/motion';
    let LogoHover = false;
    let LogoRotation = 10;
    let LogoRotateTiming = 150;
    
      let springyRotation = spring(0, {
          stiffness: 0.1,
          damping: 0.15
      });
      
      $: springyRotation.set(LogoHover ? LogoRotation : 0);
      
      $: LogoStyle = `
          transform: rotate(${$springyRotation}deg)
      `;	
  
      $: if (LogoHover) {		
          window.setTimeout(() => {LogoHover = false}, LogoRotateTiming);
      }
      
      function LogoHovered() {
          LogoHover = true;
      }
</script>

<div class="NavLogo" on:mouseenter={LogoHovered} style={LogoStyle}>
    <NavbarBrand href="#/" >
    <img class="logo" alt="logo" src="assets/image/icon.png" />
    <span class="logo-text">
        abcBank
    </span>
    </NavbarBrand>
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