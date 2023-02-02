<script>
    import { onMount } from 'svelte'
	import Tree from "./Tree.svelte"
    import { bench } from "../asciiArts"

    let mouse = [0,0]
    let pmouse = [0,0]
    let BenchRect;
    let config = []
    function createConfig(){
        return {
            location: [mouse[0] / document.body.clientWidth * 100 , 98]
        }
    }

    function handleMouseDown(){

        if(config.length < 10 && !(BenchRect.left - 50 <= mouse[0] && mouse[0] <= BenchRect.right + 50)){
            config.push(createConfig());
            config = config
        }
    }
    function handleMouseMove({clientX, clientY}){
        mouse = [clientX, clientY]
        pmouse = [clientX * document.body.clientWidth / 100, clientY * document.body.clientHeight / 100]
    }
    onMount(()=> {
        BenchRect = document.getElementsByClassName('Bench')[0].getBoundingClientRect();
    })
    function windowResize(){
        drawComponent = false;
        clearTimeout(t)
        t = setTimeout(() => {
            drawComponent = true;
        }, 50)
    }
</script>

<svelte:window 
    on:resize={windowResize}
    on:mousedown={handleMouseDown}
    on:mousemove={handleMouseMove}/>

<div class = "Park">
    {#each config as tree}
    <Tree location = {tree.location}/>
    {/each}
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