<script>
    import { mdiConsoleNetwork, mdiSourceBranchCheck } from '@mdi/js';
    import { onMount } from 'svelte'
    import { bench } from "../asciiArts"
    import { Device, season } from '../global'

    const defaultThickness = 20;
    var smallest_mag = 10;

    let mouse = [0,0]
    let pmouse = [0,0]
    let BenchRect;
    let config = []
    let Max = $Device["isMobile"] ? 5 : 20;


    var canvasWidth = document.body.clientWidth;
    var canvasHeight = document.body.clientHeight;
    var canvas;
    var ctx;

    var trees = [];

    function toUnitVector(x,y){
        let pow = Math.sqrt(Math.pow(x, 2) + Math.pow(y,2));
        return {x:x / pow, y:y / pow};
    }
    function createBranch(layer, startPoint, vector, power, mag, lightness){

        var grd = ctx.createLinearGradient(startPoint.x, startPoint.y,startPoint.x + power * vector.x, startPoint.y + power * vector.y);
        grd.addColorStop(0, hsl(lightness, layer - 1));
        grd.addColorStop(1, hsl(lightness, layer))
        return {
            layer:layer,
            startPoint: startPoint,
            unitVector:vector,
            power: power,
            mag:mag,
            lightness:lightness,
            grd:grd
        }
    }

    function createTreeConfig(){
        let origin = {
            x:mouse[0], 
            y:document.body.clientHeight - 20 - 40*Math.random()
        }
        let unitVector = {x: 0, y: -1 }
        let power = generateRandomInt(300, 500);
        
        let lightness = 360 * Math.random();
        let mag = generateRandomInt(100,115);
        let config = 
        {
            DrawingLayer: 0,
            timer : 0,
            MaximumTimer : generateRandomInt(60,120),
            Layer: 0,
            branches: [[createBranch(0, origin, unitVector, power, mag, lightness)],]
        }
        createChildBranch(config, config.branches[0][0])
        config.Layer = config.branches.length;
        trees.push(
            {
                isDrawn:false,
                config:config
            });
    }

    function createChildBranch(config, branch){
        if(branch.mag > 50){
            // console.log(branch);
            if(config.branches[branch.layer + 1] == undefined){
                config.branches[branch.layer + 1] = []
                // console.log(base.branches[branch.layer][0].power)
            }
            let branchCount = branch.layer == 0 ? generateRandomInt(3,5) : generateRandomInt(5,7)
            let top = 1;
            let sideLeft = 0;
            let sideRight = 0;
            if(branchCount % 2 == 0){
                if(Math.random() > 0.5){
                    sideLeft = branchCount / 2
                    sideRight = branchCount - top - sideLeft;
                }
                else{
                    sideRight = branchCount / 2
                    sideLeft = branchCount - top - sideRight;
                }
            }
            else{
                sideRight = sideLeft = (branchCount - top) / 2;
            }
            createTopBranch(config, branch);
            createLeftBranch(config, branch, sideLeft);
            createRightBranch(config, branch, sideRight);
            for(let i = 0; i < config.branches[branch.layer + 1].length; i++)
            {
                createChildBranch(config, config.branches[branch.layer + 1][i])
            }
        }
    }

    function createTopBranch(config, branch){
        var unitVector_c = toUnitVector(branch.unitVector.x + 0.25 - 0.5 * Math.random(), branch.unitVector.y)
        var power2 = branch.power * (Math.random() * 0.1 + 0.8 / (branch.layer + 1));
        var lightness2 = branch.lightness * 0.9;
        var mag2 = branch.mag * (Math.random() * 0.05 + 0.7);
        var newBranch =createBranch(
            branch.layer + 1,
            {
                x: branch.startPoint.x + branch.unitVector.x * branch.power,
                y: branch.startPoint.y + branch.unitVector.y * branch.power
            },  unitVector_c, power2, mag2, lightness2); 
            
        config.branches[newBranch.layer].push(newBranch);
    }
    function createLeftBranch(config, branch, sideLeft){
        for(let i = 0; i < sideLeft; i++){
            var unitVector_c = toUnitVector(branch.unitVector.x + 0.6 - 0.3 * i * Math.random(), branch.unitVector.y)
            var power2 = branch.power * (Math.random() * 0.1 + 0.8 / (branch.layer + 1));
            var lightness2 = branch.lightness * 0.9;
            var offset = 0.2 + 0.2 * i + 0.3 * Math.random()
            var mag2 = branch.mag * (Math.random() * 0.1 + 0.7);
            var newBranch = createBranch(
                branch.layer + 1,
                {
                    x: branch.startPoint.x + branch.unitVector.x * branch.power * offset,
                    y: branch.startPoint.y + branch.unitVector.y * branch.power * offset
                },  unitVector_c, power2, mag2,lightness2); 
            config.branches[newBranch.layer].push(newBranch);
        }
    }
    function createRightBranch(config, branch, sideRight){
        for(let i = 0; i < sideRight; i++){
            var unitVector_c = toUnitVector(branch.unitVector.x - 0.6 + 0.3 * i * Math.random(), branch.unitVector.y)
            var power2 = branch.power * (Math.random() * 0.1 + 0.8 / (branch.layer + 1));
            var lightness2 = branch.lightness * 0.9;
            var offset = 0.2 + 0.2 * i + 0.3 * Math.random()
            var mag2 = branch.mag * (Math.random() * 0.1 + 0.7);
            var newBranch = createBranch(
                branch.layer + 1,
                {
                    x: branch.startPoint.x + branch.unitVector.x * branch.power * offset,
                    y: branch.startPoint.y + branch.unitVector.y * branch.power * offset
                },  unitVector_c, power2, mag2, lightness2); 
            config.branches[newBranch.layer].push(newBranch);
        }
    }

    function generateRandomInt(min,max){
        return Math.floor((Math.random() * (max-min)) +min);
    }


    function handleMouseDown({clientX, clientY}){

        mouse = [clientX, clientY]
        if(config.length < Max && !(BenchRect.left - 50 <= mouse[0] && mouse[0] <= BenchRect.right + 50)){
            config.push(createTreeConfig());
            config = config
        }
    }
    var hue = 360 * Math.random();
    function hsl(lightness, layer) {
        return 'hsl(' + lightness + ',70%,' + 100 * Math.pow(0.95, layer) + '%)';
    }
    
    function drawLayer(branches, t, t_Max){
        for(let i = 0; i < branches.length; i++){
            ctx.strokeStyle = branches[i].grd;
            ctx.beginPath();
            ctx.moveTo(branches[i].startPoint.x, branches[i].startPoint.y);
            ctx.lineTo(branches[i].startPoint.x + branches[i].power * branches[i].unitVector.x * t / t_Max, branches[i].startPoint.y + branches[i].power * branches[i].unitVector.y * t / t_Max)
            ctx.lineWidth = branches[i].power / 25;
            ctx.stroke();
//            ctx.fill();
        }
    }

    let t = 0;

    function loop(onFrame) {
        for(let i = 0; i < trees.length; i++){
            if(!trees[i].isDrawn){
                drawLayer(trees[i].config.branches[trees[i].config.DrawingLayer], trees[i].config.timer++, trees[i].config.MaximumTimer);

                if(trees[i].config.timer == trees[i].config.MaximumTimer){
                    trees[i].config.DrawingLayer++;
                    trees[i].config.timer = 0;
                }
                if(trees[i].config.DrawingLayer == trees[i].config.Layer){
                    trees[i].isDrawn = true;
                }
            }
        }

        // var endDate = new Date();
        // var duration = (endDate - startDate);
        // avgTime += duration;

        // frameCounter++;

        requestAnimationFrame(loop);
    }

    onMount(async () => {
        BenchRect = document.getElementsByClassName('Bench')[0].getBoundingClientRect();

        ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';

        loop();
    })
</script>

<svelte:window 
    on:mousedown={handleMouseDown}/>

<div class = "Park">
    <canvas bind:this={canvas} width={canvasWidth} height={canvasHeight}></canvas>
    <div class="Bench" style="top:90%; left:20%;">
        <pre>
        <br/>
        <b>
            { $bench }
        </b>
        </pre>
    </div>
</div>

<style>
    .Park{
        top:0%;
        left:0%;
        position: absolute;
        width:100%;
        height:100%;
        z-index:1;
    }
    .Bench{
        position: absolute;
        color:#000;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%) scale(0.2,0.1);
        z-index:9998;
        -ms-user-select: none; 
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
</style>