<script>
    import { empty } from "svelte/internal";

    export let open = false;
    let open_pre = false;
    let t;
    let openTimerRunning = false;
    let closeTimerRunning = false;

    export let isMobile = false;
  </script>
  
  <li class="nav-item" 
    on:mouseenter|preventDefault={() => {
        if(!isMobile){
            open_pre = true;
            clearTimeout(t)
            t = setTimeout(() => {
                open = open_pre;
            }, 300)
        }
    }} 
    on:mouseleave|preventDefault={() => {
        if(!isMobile){
            open_pre = false;
            clearTimeout(t)
            t = setTimeout(() => {
                open = open_pre; 
            }, 300)
        }
    }}
    on:click|preventDefault={
        () => {
            if(isMobile)
                open = !open;
        }
    }
    on:keypress={empty}
    >
      <div>
          <slot name="trigger" />
      </div>
  
      {#if open}
        <slot />
      {/if}
  </li>
  
  <style>
      .nav-item {
          width:8vw;
          min-width: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          
        -ms-user-select: none; 
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
      }
  </style>