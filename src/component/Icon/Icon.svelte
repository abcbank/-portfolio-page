<script>
    export let size = '1.5em';
    export let width = size;
    export let height = size;
    export let color = 'currentColor';
    export let viewBox = '0 0 24 24';
    export let path = '';
    export let str=''
  </script>
  
  <svg
    {width}
    {height}
    {viewBox}
    class={$$props.class}
    style={$$props.style}
  >
    {#if str == ''}
    <path d={path} fill={color} />
    {:else}
    {str}
    {/if}
  </svg>
  
  <style>
      svg {
          display: inline-block;
      }
  </style>
  