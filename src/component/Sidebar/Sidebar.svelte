<script>
    import Toggler from './Toggler.svelte'
	import {clickOutside} from './clickOutside.js';

	export let open = false

    let documentSize = [document.body.clientWidth, document.body.clientHeight]

    function handleClickOutside(){
        open = false;
    }
</script>

<div use:clickOutside on:click_outside={handleClickOutside}>
    <Toggler bind:open />
    <aside style="width:{document.body.clientWidth / 2}px; height:{document.body.clientHeight  - 60}px;" class:open>
        <nav>
            <a class="block" href="#about">About</a>
            <a class="block" href="#contact">Contact</a>
        </nav>
    </aside>
</div>

<style>
    div{
        display:inline-block;
    }
	aside {
        position:absolute;
        background-color:#282a35;
        top:60px;
        width:33%;
        height:100%;
		left: 100%;
		transition: left 0.3s ease-in-out
	}
	
	.open {
        z-index:20;
        opacity:1;
		left: 67%;
	}
</style>