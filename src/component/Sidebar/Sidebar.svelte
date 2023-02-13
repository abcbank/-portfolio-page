<script>
    import Toggler from './Toggler.svelte'
	import {clickOutside} from './clickOutside.js';

	export let open = false
    export let onClose;

    let documentSize = [document.body.clientWidth, document.body.clientHeight]

    function handleClickOutside(){
        onClose();
        open = false;
    }
</script>

<div use:clickOutside on:click_outside={handleClickOutside}>
    <Toggler bind:open onClose={onClose} />
    <aside style="height:{document.body.clientHeight  - 60}px;" class:open>
        <slot/>
    </aside>
</div>

<style>
    div{
        display:inline-block;
    }
	aside {
        padding:2px;
        position:absolute;
        background-color:#282a35;
        top:60px;
        width:40%;
        min-width: 150px;
        height:100%;
		right: -100%;
		transition: right 0.3s ease-in-out
	}
	
	.open {
        z-index:20;
        opacity:1;
		right: 0%;
	}
</style>