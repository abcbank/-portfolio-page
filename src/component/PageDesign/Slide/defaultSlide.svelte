<script>
    export let color;
    export let Pages;
    export let curPage;
    export let maxPage;
    let fontSize = 2
    let ButtonType = -1
    let doubleClickTimer;
    curPage = 1;
    maxPage = Pages.length;

    function moveNext(){
        if(curPage != maxPage)
            curPage = curPage + 1;
    }
    function movePrev(){
        if(curPage != 1)
            curPage = curPage - 1;
    }
    function setButtonType(e){
        if(e.button == 0){
            if(ButtonType == 0){
                ButtonType = -1
                moveNext();
                console.log("moveNext");
            }
            else{
                ButtonType = 0;
                clearTimeout(doubleClickTimer);
                doubleClickTimer = setTimeout(() => {
                    ButtonType = -1
                }, 400)
            }
        }
        else if(e.button == 2){
            if(ButtonType == 2){
                ButtonType = -1
                movePrev();
                console.log("movePrev");
            }
            else{
                ButtonType = 2;
                clearTimeout(doubleClickTimer);
                doubleClickTimer = setTimeout(() => {
                    ButtonType = -1
                }, 400)
            }
        }
    }
</script>

<svelte:window on:mousedown={setButtonType}/>
<div>
	{#each Pages as Page}
		{#if curPage == Page.index}
			<svelte:component this={Page.component} bind:color={color} bind:fontSize={fontSize} bind:curPage={curPage} />
		{/if}
	{/each}
    <slot></slot>
</div>

<style>
    div{
        width:100%;
        height:100%;
		color: white;
	    align-items: center;
		justify-content: center;
        
        -ms-user-select: none; 
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
</style>