<script>
    import { season } from "../global"
    import { onMount } from 'svelte'
	import { fish, fish_01, fish_02, fish_03, fish_04, fish_05, fish_06, fish_07, fish_08, fish_09, fish_10, fish_11, fish_12 } from "../asciiArts"
    import { linear, circInOut,  cubicInOut, expoInOut } from 'svelte/easing';

    // a bunch of variables defining the snow and how it falls
    const TARGET_FPS = 60
  
    const MS_BETWEEN_FRAMES = 1000 / TARGET_FPS

    let easingType = [ linear, circInOut, cubicInOut, expoInOut ]

    let config;
    let idx = 0;
    let lastTime = 0;

    let mx,my;
    let mouseclick =false;

    function createConfig(){
        return {
            scale: 0.02 + Math.random() / 60,
            startPoint : [Math.random() * 100,Math.random() * 100],
            destPoint: [Math.random() * 100,Math.random() * 100],
            movingVector: [0,0],
            sleepingTime : 0,
            time: 0,
            runningOffset: 0.7 + Math.random() * 0.3,
            runningAway: false
        }
    }

    function getPower(Vector){
        return Math.sqrt(Math.pow(Vector[0], 2) + Math.pow(Vector[1], 2) + 1);
    }

    function axisFilter(i){
        if(i < 0)
            return 0;
        else if(i > 100)
            return 100;
        else
            return i
    }

    function nextFrame(timestamp){
        let elapsed = timestamp - lastTime;
        let speed = getPower(config.movingVector);
        if(elapsed / 30 * speed > MS_BETWEEN_FRAMES && config.sleepingTime == 0){
            lastTime = timestamp
            idx = (idx + 1 ) % 12;
        }
        return elapsed;
    }
    function destArrived(awaitTime){
        if(config.sleepingTime < awaitTime){
            config.sleepingTime++;
        }
        else{
            config.sleepingTime = 0;
            config.time = 0;
            config.movingVector = [0,0]
            config.destPoint = [Math.random() * 100, Math.random() * 100]
            config.runningAway = false;
        }
    }
    function runAway(runningVector){
        let distance = getPower(runningVector);

        runningVector = [runningVector[0] / distance, runningVector[1] / distance]
        config.movingVector = [runningVector[0] * 150, runningVector[1] * 150];
        config.startPoint = [axisFilter(config.startPoint[0] + config.movingVector[0] / 15), axisFilter(config.startPoint[1] + config.movingVector[1] / 15)];

        config.time = 0;
        config.sleepingTime = 0;
        config.time++;
        config.runningAway = true;
    }

    function runningAway(){
        let toMovePower = getPower(config.movingVector)
        if(toMovePower < 2){
            destArrived(20);
        }
        else{
            config.movingVector = [config.movingVector[0] * config.runningOffset, config.movingVector[1]  * config.runningOffset];
        }
        if(config.sleepingTime == 0){
            config.startPoint = [config.startPoint[0] + config.movingVector[0] / 30, config.startPoint[1] + config.movingVector[1] / 30];
        }
        config.time++;
    }

    function moveToDest(){
        let toMoveVector = [config.destPoint[0] - config.startPoint[0], config.destPoint[1] - config.startPoint[1]];
        let toMovePower = getPower(toMoveVector)
        if(toMovePower < 2){
            destArrived(80);
        }
        else{
            var offset = Math.random();
            config.movingVector = [config.movingVector[0] * offset + toMoveVector[0] * (1 - offset) * config.time / 500, config.movingVector[1] * offset  + toMoveVector[1] * (1 - offset) * config.time / 500];
        }
        if(config.sleepingTime == 0){
            config.startPoint = [config.startPoint[0] + config.movingVector[0] / 30, config.startPoint[1] + config.movingVector[1] / 30];
        }
        config.time++;
    }
    function move(){
        if(config.runningAway){
            runningAway();
        }
        else{
            moveToDest();
        }
    }

    config = createConfig();
    onMount(async () => {
      let frame
      function loop(timestamp) {
        frame = requestAnimationFrame(loop)

        let elapsed = nextFrame(timestamp, lastTime);

        if(elapsed > MS_BETWEEN_FRAMES){
            if(mouseclick){
                // mouseclick = $clicked;
                mouseclick = false;
                let mouseX = 100 - (document.body.clientWidth - mx) / document.body.clientWidth * 100;
                let mouseY = 100 - (document.body.clientHeight - my) / document.body.clientHeight * 100;

                let runningVector = [config.startPoint[0] - mouseX, config.startPoint[1] - mouseY];
                let distance = getPower(runningVector);

                if(distance < 30){
                    runAway(runningVector);
                } 
                else{
                    move();
                }
            }
            else{
                move();
            }
        }
      }
      loop()
      if($season == "Summer")
        return () => cancelAnimationFrame(frame)
      else
        return;
    })
    function handleMouseDown(){
        mouseclick = true;
    }
    function handleMouseMove({clientX, clientY}){
        mx = clientX
        my = clientY
    }
  </script>
  
<svelte:window 
    on:mousedown={handleMouseDown}
    on:mousemove={handleMouseMove}/>
<div class="Fish" style="transform: translate(-50%, -50%) rotate({Math.atan2(config.movingVector[1], config.movingVector[0]) + Math.PI / 2}rad) scale({config.scale}); left: {config.startPoint[0]}%; top: {config.startPoint[1]}%;">
    <pre>
    <br/>
    <b>

        {#if idx == 0}
            { $fish_01 }
        {:else if idx == 1}
            { $fish_02 }
        {:else if idx == 2}
            { $fish_03 }
        {:else if idx == 3}
            { $fish_04 }
        {:else if idx == 4}
            { $fish_05 }
        {:else if idx == 5}
            { $fish_06 }
        {:else if idx == 6}
            { $fish_07 }
        {:else if idx == 7}
            { $fish_08 }
        {:else if idx == 8}
            { $fish_09 }
        {:else if idx == 9}
            { $fish_10 }
        {:else if idx == 10}
            { $fish_11 }
        {:else if idx == 11}
            { $fish_12 }
        {/if}
    </b>
    </pre>
</div>

<style>  
    .Fish{
        position: absolute;
        color:#000;
                
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);

        -ms-user-select: none; 
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
</style>