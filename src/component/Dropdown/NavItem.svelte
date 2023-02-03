<script>
    let open = false;
    let open_pre = false;
    let t;
    let openTimerRunning = false;
    let closeTimerRunning = false;
    function empty(){

    }
  </script>
  
  <li class="nav-item" 
    on:mouseenter|preventDefault={() => {
        open_pre = true;
        clearTimeout(t)
        t = setTimeout(() => {
            open = open_pre;
        }, 300)
    }} 
    on:mouseleave|preventDefault={() => {
        open_pre = false;
        clearTimeout(t)
        t = setTimeout(() => {
            open = open_pre; 
        }, 300)
    }}>
      <div>
          <slot name="trigger" />
      </div>
  
      {#if open}
        <slot />
      {/if}
  </li>
  
  <style>
      .nav-item {
          width: calc(var(--nav-size) * 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
      }
  </style>