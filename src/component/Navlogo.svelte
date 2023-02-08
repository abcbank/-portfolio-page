<script>
    import { spring } from 'svelte/motion';

    export let pushFunc;

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
  <img class="logo" alt="logo" src="assets/image/icon.png" />
  <span class="logo-text">
      abcBank
  </span>
</div>

<style> 
  .NavLogo{
    float:left;
		display: flex;
    text-align:center;
    align-items: center;
		justify-content: center;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  .logo {
    width:30px; 
    height:30px;
  }
  .logo-text{
    padding-left:10px;
    color:#fff;
    font-size:1.4rem;
  }
</style>