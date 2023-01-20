<script>
    import jQuery from 'jquery'
    import { onMount } from 'svelte'
  	import Fish from "./Fish.svelte"

    onMount(() => {
      jQuery(".full-landing-image").ripples({
         resolution: 256, // 렌더링 값이 클수록 잔물결 효과가 느리게 전파
         perturbance: 0.04, // 잔물경 굴절 강도. 0은 굴절 없음
      });
    })
    // const TARGET_FPS = 60
  
    // const MS_BETWEEN_FRAMES = 1000 / TARGET_FPS
    // let show = [false,]
    // let timer = []
      
    // onMount(async () => {
    //   let frame, lastTime

    //   for(let i = 0; i < 100; i++)
    //     show[i] = false;

    //   function loop(timestamp) {
    //     frame = requestAnimationFrame(loop)
  
    //     const elapsed = timestamp - lastTime
    //     lastTime = timestamp
  
    //     let framesCompleted = elapsed / MS_BETWEEN_FRAMES
  
    //     if (isNaN(framesCompleted)) {
    //       framesCompleted = 1        
    //     }
    //     if($clicked){
    //       let i = getWaveIndex();
    //       if(i >= 0){
    //         show[i] = true;
    //         timer[i] = setTimeout(() => {
    //             show[i] = false;
    //         }, 10000)
    //         $clicked = false;
    //       }
    //     }
    //   }
  
    //   loop()
  
    //   return () => cancelAnimationFrame(frame)
    // })
    // function getWaveIndex(){
    //   return show.indexOf(false);
    // }
</script>
<div class = "Lake">
  <Fish/>
  <Fish/>
  <Fish/>
  <Fish/>
  <Fish/>
  <Fish/>
  <!-- {#each show as isEnabled}
    {#if isEnabled}
      <Waterwave/>
    {/if}
  {/each} -->
</div>

<style>
</style>