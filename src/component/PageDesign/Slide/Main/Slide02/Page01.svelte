<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'
    import { onMount } from 'svelte'
    import { fade } from "svelte/transition"

    export let color = "transparent";
    export let fontSize = 2

    const calcMainFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/4;

    let Slide_01 = true;
    let Slide_02 = false;
    let animationStart = false;
    let visibility = true;
    let t;
    
    function startSlideChangeTimer(){
        clearTimeout(t);
        t = setTimeout(() => {
            Slide_01 = false;
            clearTimeout(t);
            t = setTimeout(() => {
                Slide_02 = true;
                startAnimationTimer();
            }, 300)
        }, 1000)
    }
    function startAnimationTimer(){
        clearTimeout(t);
        visibility = true;
        t = setTimeout(() => {
            animationStart = true;
            animationFinished();
        }, 2000)
    }
    function animationFinished(){
        clearTimeout(t);
        t = setTimeout(() => {
            restartAnimation();
        }, 2500)
    }
    function restartAnimation(){
        visibility = false;
        animationStart = false;
        clearTimeout(t);
        t = setTimeout(() => {
            startAnimationTimer();
        }, 1500)
    }
    onMount(() => {
        Slide_01= true;
        Slide_02 = false;
        startSlideChangeTimer();
    })
</script>

<DefaultPage color={color} fontSize={fontSize}>
    {#if Slide_01}
        <p out:fade={{duration:200,}}>잘 하셨습니다!</p>
    {:else if Slide_02}
        <div class="Section" style="height:100%; width:100%;" in:fade={{delay:300, duration:200}}>
            <div class="header" style="height:20%; font-size:{calcSubFontSize()}rem;">
                {#if $Device["isMobile"]}
                    오른쪽 화면을 두번 터치해 다음 페이지로 이동해보세요.
                {:else}
                    왼쪽 마우스 더블 클릭을 통해 다음 페이지로 이동해보세요.
                {/if}
            </div>
        </div>
    {/if}
</DefaultPage>

<style>    
    .Section{
		display: flex;
        text-align:center;
	    align-items: center;
		justify-content: center;
        flex-direction:column;
    }
    .header{
		display: flex;
        text-align:center;
	    align-items: center;
		justify-content: center;
        width:100%;
        height:15%;
    }
</style>