<script>
    import jQuery from 'jquery'
    import { onMount } from 'svelte'
	import Tree from "./Tree.svelte"

    let mouse = [0,0]
    let config = []
    function createConfig(){
        return {
            location: [mouse[0] / document.body.clientWidth * 100 , 95]
        }
    }

    function handleMouseDown(){
        if(config.length < 10 ){
            config.push(createConfig());
            config = config
        }
    }
    function handleMouseMove({clientX, clientY}){
        mouse = [clientX, clientY]
    }
</script>

<svelte:window 
    on:mousedown={handleMouseDown}
    on:mousemove={handleMouseMove}/>

<div class = "Park">
    {#each config as tree}
    <Tree location = {tree.location}/>
    {/each}
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
    .temp{
        position: absolute;
        top:20%;
        left:20%;
        width:100%;
        height:100px;

        background:
            repeating-linear-gradient(190deg, rgba(0, 132, 255, 0.5) 10%,
                rgba(0, 255, 234, 0.5) 20%, rgba(98, 100, 219, 0.5) 30%,
                rgba(0, 60, 255, 0.5) 40%, rgba(0, 238, 255, 0.5) 50%,
                rgba(4, 0, 250, 0.5) 60%, rgba(148, 189, 250, 0.5) 70%,
                rgba(0, 17, 255, 0.5)  75%),
            repeating-linear-gradient(-190deg, rgba(0, 132, 255, 0.5) 8%,
                rgba(0, 255, 234, 0.5) 16%, rgba(98, 100, 219, 0.5) 24%,
                rgba(0, 60, 255, 0.5)  32%, rgba(0, 238, 255, 0.5) 40%,
                rgba(4, 0, 250, 0.5)   48%, rgba(148, 189, 250, 0.5) 56%,
                rgba(0, 17, 255, 0.5) 60%),
            repeating-linear-gradient(23deg, red 10%, orange 20%,
                yellow 30%, green 40%, blue 50%,
                indigo 60%, violet 70%, red 73%);
    }
    .tem{
        position: absolute;
        top:40%;
        left:40%;
        width:100px;
        height:100px;

        background:
            repeating-linear-gradient(190deg, rgba(0, 132, 255, 0.5) 10%,
                rgba(0, 255, 234, 0.5) 20%, rgba(98, 100, 219, 0.5) 30%,
                rgba(0, 60, 255, 0.5) 40%, rgba(0, 238, 255, 0.5) 50%,
                rgba(4, 0, 250, 0.5) 60%, rgba(148, 189, 250, 0.5) 70%,
                rgba(0, 17, 255, 0.5)  75%),
            repeating-linear-gradient(-190deg, rgba(0, 132, 255, 0.5) 8%,
                rgba(0, 255, 234, 0.5) 16%, rgba(98, 100, 219, 0.5) 24%,
                rgba(0, 60, 255, 0.5)  32%, rgba(0, 238, 255, 0.5) 40%,
                rgba(4, 0, 250, 0.5)   48%, rgba(148, 189, 250, 0.5) 56%,
                rgba(0, 17, 255, 0.5) 60%)
    }
</style>