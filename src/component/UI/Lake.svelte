<script>
    import jquery from 'jquery'
    import { onMount } from 'svelte'
  	import Fish from "./Fish.svelte"

    onMount(() => {
      jquery(".full-landing-image").ripples({
         resolution: 256, // 렌더링 값이 클수록 잔물결 효과가 느리게 전파
         perturbance: 0.02, // 잔물경 굴절 강도. 0은 굴절 없음
      });
      jquery(".full-landing-image").ripples('play');
    })
</script>
<div class = "Lake">
  <Fish/>
  <Fish/>
  <Fish/>
  <Fish/>
  <Fish/>
</div>

<style>
</style>