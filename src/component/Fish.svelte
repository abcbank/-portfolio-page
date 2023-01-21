<script>
    import { onMount } from 'svelte'
    import jQuery from "jquery";
	import { norm1, norm2, norm3, norm4, norm5, norm6, norm7, norm8, norm9, norm10, norm11, norm12 } from "../fishTemplate"
    import { linear, circInOut,  cubicInOut, expoInOut } from 'svelte/easing';
    import { tweened } from 'svelte/motion';
    import { mx, my, clicked } from "../mouseStatus"

    // a bunch of variables defining the snow and how it falls
    const FLAKES_COUNT = 10
    const MELTING_SPEED = 1.12
    const WIND_FORCE = 0.01
    const MIN_DURATION = 10000
    const MAX_DURATION = 30000
    const TARGET_FPS = 60
    const MIN_SIZE = 10
    const MAX_SIZE = 14
  
    const MS_BETWEEN_FRAMES = 1000 / TARGET_FPS

    let easingType = [ linear, circInOut, cubicInOut, expoInOut ]

    let config;
    let idx = 0;
    let lastTime = 0;
    let mouseclick = 0;

    function createConfig(){
        return {
            scale: 0.02 + Math.random() / 60,
            startPoint : [Math.random() * 100,Math.random() * 100],
            destPoint: [Math.random() * 100,Math.random() * 100],
            movingVector: [0,0],
            sleepingTime : 0,
            time: 0
        }
    }

    function getPower(Vector){
        return Math.sqrt(Math.pow(Vector[0], 2) + Math.pow(Vector[1], 2) + 1);
    }

    function mouseClicked(){
        return mouseclick != $clicked;
    }
    function axisFilter(i){
        if(i < 0)
            return 0;
        else if(i > 100)
            return 100;
        else
            return i
    }
    config = createConfig();
    onMount(async () => {
      let frame
  
      function loop(timestamp) {
        frame = requestAnimationFrame(loop)

        const elapsed = timestamp - lastTime;
        let speed = getPower(config.movingVector);
        if(elapsed / 150 * speed > MS_BETWEEN_FRAMES && config.sleepingTime == 0){
            lastTime = timestamp
            idx = (idx + 1 ) % 12;      
        }
        if(elapsed > MS_BETWEEN_FRAMES){
            if(mouseClicked()){
                mouseclick = $clicked;
                let mouseX = 100 - (document.body.clientWidth - $mx) / document.body.clientWidth * 100;
                let mouseY = 100 - (document.body.clientHeight - $my) / document.body.clientHeight * 100;

                let runningVector = [config.startPoint[0] - mouseX, config.startPoint[1] - mouseY];
                let distance = getPower(runningVector);
                if(distance < 30){
                    runningVector = [runningVector[0] / distance, runningVector[1] / distance]

                    let destX = axisFilter(mouseX + runningVector[0] * 1000 / distance);
                    let destY = axisFilter(mouseY + runningVector[1] * 1000 / distance);

                    config.movingVector = [runningVector[0] * 5000, runningVector[1] * 5000];

                    config.startPoint = [axisFilter(config.startPoint[0] + config.movingVector[0] / 1500), axisFilter(config.startPoint[1] + config.movingVector[1] / 1500)];
                    config.destPoint = [axisFilter(config.startPoint[0] + config.movingVector[0] / 100 ), axisFilter(config.startPoint[1] + config.movingVector[1] / 100)];
                    config.time = 0;
                    config.sleepingTime = 0;
                    config.time++;
                } 
                else{
                    let toMoveVector = [config.destPoint[0] - config.startPoint[0], config.destPoint[1] - config.startPoint[1]];
                    let toMovePower = getPower(toMoveVector)
                    if(toMovePower < 2){
                        if(config.sleepingTime < 80){
                            config.sleepingTime++;
                        }
                        else{
                            config.sleepingTime = 0;
                            config.time = 0;
                            config.destPoint = [Math.random() * 100, Math.random() * 100]
                        }
                    }
                    else{
                        var offset = Math.random();
                        config.movingVector = [config.movingVector[0] * offset + toMoveVector[0] * (1 - offset) * config.time / 500, config.movingVector[1] * offset  + toMoveVector[1] * (1 - offset) * config.time / 500];
                    }
                    if(config.sleepingTime == 0){
                        config.startPoint = [config.startPoint[0] + config.movingVector[0] / 300, config.startPoint[1] + config.movingVector[1] / 300];
                    }
                    config.time++;
                }
            }
            else{
                let toMoveVector = [config.destPoint[0] - config.startPoint[0], config.destPoint[1] - config.startPoint[1]];
                let toMovePower = getPower(toMoveVector)
                if(toMovePower < 2){
                    if(config.sleepingTime < 80){
                        config.sleepingTime++;
                    }
                    else{
                        config.sleepingTime = 0;
                        config.time = 0;
                        config.destPoint = [Math.random() * 100, Math.random() * 100]
                    }
                }
                else{
                    var offset = Math.random();
                    config.movingVector = [config.movingVector[0] * offset + toMoveVector[0] * (1 - offset) * config.time / 500, config.movingVector[1] * offset  + toMoveVector[1] * (1 - offset) * config.time / 500];
                }
                if(config.sleepingTime == 0){
                    config.startPoint = [config.startPoint[0] + config.movingVector[0] / 300, config.startPoint[1] + config.movingVector[1] / 300];
                }
                config.time++;
            }
        }
      }
      loop()
  
      return () => cancelAnimationFrame(frame)
    })
  </script>
<div class="Fish" style="transform: translate(-50%, -50%) rotate({Math.atan2(config.movingVector[1], config.movingVector[0]) + 0.5 * Math.PI}rad) scale({config.scale}); left: {config.startPoint[0]}%; top: {config.startPoint[1]}%;">
    <pre>
    <br/>
    <b>
        {#if idx == 0}
            { $norm1 }
        {:else if idx == 1}
            { $norm2 }
        {:else if idx == 2}
            { $norm3 }
        {:else if idx == 3}
            { $norm4 }
        {:else if idx == 4}
            { $norm5 }
        {:else if idx == 5}
            { $norm6 }
        {:else if idx == 6}
            { $norm7 }
        {:else if idx == 7}
            { $norm8 }
        {:else if idx == 8}
            { $norm9 }
        {:else if idx == 9}
            { $norm10 }
        {:else if idx == 10}
            { $norm11 }
        {:else if idx == 11}
            { $norm12 }
        {:else}
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
    .Fish .pre{
        background-color:#fff;
    }
</style>