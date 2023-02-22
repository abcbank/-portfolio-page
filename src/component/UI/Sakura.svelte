<script>
  import { Device, season } from "../../global"
    import { onMount } from 'svelte'
  
    // a bunch of variables defining the snow and how it falls
    const FLAKES_COUNT = 100
    const MELTING_SPEED = 1.12
    const WIND_FORCE = 0.01
    const FALL_MIN_SPEED = 0.01
    const FALL_MAX_SPEED = 0.2
    const TARGET_FPS = 60
    const MIN_SIZE = 10
    const MAX_SIZE = 14
  
    const MS_BETWEEN_FRAMES = 1000 / TARGET_FPS
    const scaleOffset = $Device["isMobile"] ? 1 : 1;
  
    const boundary = 100;

    let mx = 0;
    let my = 0;
    let dx = 0;
    let dy = 0;
    let timer;

    const MousePowerOffet = $Device["isMobile"] ? 10 : 5

    function getPower(a, b, time){
        return a + b / (time * 0.5)
        //Math.abs(a + b / (time * 0.5)) 
        //Math.sqrt(Math.pow(a, 2) + Math.pow(b / (time * 0.5), 2))
    }
    function getDir(a, b, time){
        return a + b / (time * 0.5) > 0.0 ? true : false;
    }
        
    function handleMouseMove({clientX, clientY}){
      if(!$Device["isMobile"]){
        clearTimeout(timer)
        timer = setTimeout(() => {
          dx = 0;
          dy = 0;
        }, 50)
        
        dx = mx - clientX;
        dy = my - clientY;
        mx = clientX
        my = clientY
      }
    }
    function handleTouchMove(e){
      if($Device["isMobile"]){
        clearTimeout(timer)
        timer = setTimeout(() => {
          dx = 0;
          dy = 0;
        }, 50)
        
        dx = mx - e.touches[0].clientX;
        dy = my - e.touches[0].clientY;
        mx = e.touches[0].clientX
        my = e.touches[0].clientY
      }
    }

    // this function generates the random configuration with all necessary values
    function randomSnowflakeConfig(i) {
        var temp = {
            scale: (0.8 + Math.random() * (1 - 0.8)) / scaleOffset,
            height: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
            width: 0,
            borderRadius: [0,0],
            x: -20 + Math.random() * 120,
            y: -100 + Math.random() * 200,
            rotation: Math.floor(Math.random() * 360),
            speed: FALL_MIN_SPEED + Math.random() * (- FALL_MIN_SPEED + FALL_MAX_SPEED),
            opacity: 0.999,
            GravityForce: [0,0],
            MouseForce: [0,0],
            MouseTouchedTime : 1,
            EnableMouseForce : true
        }
        if($Device["isMobile"])
          temp.scale = temp.scale / 3;
        temp.GravityForce[0] = WIND_FORCE;
        temp.GravityForce[1] = temp.speed;
        temp.width = temp.height - Math.floor(Math.random() * temp.height / 3)
        temp.borderRadius = [MAX_SIZE + Math.floor(Math.random() * 10), Math.floor(1 + Math.random() * (temp.width / 4))]
      return temp;
    }

    // actially generating the sakuraflakes
    let sakuraflakes = new Array(FLAKES_COUNT)
      .fill()
      .map((_, i) => randomSnowflakeConfig(i))
      .sort((a, b) => a.scale - b.scale)
  
    // in onMount we define the loop function and start our animationFrame loop.
    onMount(async () => {
      let frame, lastTime
  
      function loop(timestamp) {
        frame = requestAnimationFrame(loop)
  
        const elapsed = timestamp - lastTime
        lastTime = timestamp
  
        let framesCompleted = elapsed / MS_BETWEEN_FRAMES
  
        if (isNaN(framesCompleted)) {
          framesCompleted = 1        
        }
        
        sakuraflakes = sakuraflakes.map(flake => {
            let dirX = false;
            let dirY = false;
            let powX = 0;
            let powY = 0;

          if (flake.y >= 100) {
            flake.opacity = Math.pow(flake.opacity, MELTING_SPEED)
          } else {
            let p_flake_x = flake.x * document.body.clientWidth / 100;
            let p_flake_y = flake.y * document.body.clientHeight / 100;
            
            if( flake.EnableMouseForce &&
            mx != 0 && mx != 0 && 
            mx - boundary/2 <= p_flake_x && p_flake_x <= mx + boundary / 2 && 
            my - boundary/2 <= p_flake_y && p_flake_y <= my + boundary / 2 ){
                let distance = Math.sqrt(Math.pow(p_flake_x - mx, 2) + Math.pow(p_flake_y - my,2)) / 1000
                flake.MouseForce = [-1/distance * MousePowerOffet * dx / document.body.clientWidth, -1/distance * MousePowerOffet * dy / document.body.clientHeight];
                flake.MouseTouchedTime = 1;
                flake.EnableMouseForce = false;
            }
            else if(
            mx - boundary/2 <= p_flake_x && p_flake_x <= mx + boundary / 2 && 
            my - boundary/2 <= p_flake_y && p_flake_y <= my + boundary / 2){
                flake.EnableMouseForce = true;
            }

            flake.rotation = (flake.rotation + 1 * framesCompleted) % 360;

            dirX = getDir(flake.GravityForce[0], flake.MouseForce[0], flake.MouseTouchedTime)
            dirY = getDir(flake.GravityForce[1], flake.MouseForce[1], flake.MouseTouchedTime)
            powX = getPower(flake.GravityForce[0], flake.MouseForce[0], flake.MouseTouchedTime)
            powY = getPower(flake.GravityForce[1], flake.MouseForce[1], flake.MouseTouchedTime)

            flake.x += getPower(flake.GravityForce[0], flake.MouseForce[0], flake.MouseTouchedTime)
            flake.y += getPower(flake.GravityForce[1], flake.MouseForce[1], flake.MouseTouchedTime)
            
            flake.MouseTouchedTime++;
          }
          if (flake.opacity <= 0.02) {
            flake.MouseForce = [0,0];
            flake.x = -20 + Math.random() * 120
            flake.y = -20
            flake.opacity = 0.999
          }

          return flake
        })
      }
  
      loop()
      if($season == "Spring")
        return () => cancelAnimationFrame(frame)
      else 
        return;
    })
  </script>

<svelte:window 
  on:touchmove={handleTouchMove}
  on:mousemove={handleMouseMove}/>

<div class="sakuraframe" aria-hidden="true">
    {#each sakuraflakes as flake}
      <div
        class="sakuraflake"
        style={`opacity: ${flake.opacity}; height: ${flake.height}; width: ${flake.width}; border-radius: ${flake.borderRadius[0]}px ${flake.borderRadius[1]}px;
        transform: scale(${flake.scale}) rotate(${flake.rotation}deg); left: ${flake.x}%; top: calc(${flake.y}% - ${flake.scale}rem)`}>
      </div>
    {/each}
  </div>

  <style>  
    .sakuraflake {
      background-color: #fff;
      background: linear-gradient( 120deg, rgba(255, 183, 197, 0.9), rgba(255, 197, 208, 0.9) );
      width:20px;
      height:20px;
      font-family: Arial, sans-serif;
      position: absolute;
      z-index: 1000;
      overflow: hidden;
      -webkit-user-select: none; /* Safari */
      -ms-user-select: none; /* IE 10 and IE 11 */
      user-select: none; /* Standard syntax */
    }
  </style>