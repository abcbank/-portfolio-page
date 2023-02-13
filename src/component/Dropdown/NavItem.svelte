<script>
    import { empty } from "svelte/internal";

    export let open = false;
    let open_pre = false;
    let t;
    let openTimerRunning = false;
    let closeTimerRunning = false;

    export let Side = false;
    export let preOpen = isEmpty;

    function isEmpty(){

    }
  </script>
  
  <li class="nav-item" class:isSide = {Side}
    on:mouseenter|preventDefault={() => {
        if(!Side){
            open_pre = true;
            clearTimeout(t)
            t = setTimeout(() => {
                open = open_pre;
            }, 300)
        }
    }} 
    on:mouseleave|preventDefault={() => {
        if(!Side){
            open_pre = false;
            clearTimeout(t)
            t = setTimeout(() => {
                open = open_pre; 
            }, 300)
        }
    }}
    on:keypress={empty}
    >
      <div class:isSide={Side} 
      on:click|preventDefault={
          () => {
              if(Side){
                  console.log("aaa");
                  if(!open){
                      preOpen();
                      open = true;
                  }
                  else{
                      open = false;
                  }
              }
          }
      } 
    on:keypress={empty}>
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
      .isSide{
        width:100%;
      }
  </style>