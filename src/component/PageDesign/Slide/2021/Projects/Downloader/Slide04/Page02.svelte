<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2;
    export let curPage

    let CurPage = "main"

    console.log($Color["btnBackColor"][$season]);

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize} bind:curPage={curPage}>
    <div style="position:absolute; top:5%; width:100%;">
        <p>구성 요소</p>
    </div>
    <div class="borderBox" 
        on:click={()=> {curPage = 3}} on:keydown={()=>{}}
        style="font-size:{calcSubFontSize() * 0.8}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]}; top: 35%; left: 30%;">
        SPI
    </div>
    <div class="borderBox" 
        style="font-size:{calcSubFontSize() * 0.8}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]}; top: 35%; left: 50%;">
        PC
    </div>
    <div class="borderBox" 
        style="font-size:{calcSubFontSize() * 0.8}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]}; top: 35%; left: 70%;">
        IO
    </div>
    <div class="borderBox" 
        style="font-size:{calcSubFontSize() * 0.8}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]}; top: 65%; left: 40%;">
        전류계
    </div>
    <div class="borderBox" 
        style="font-size:{calcSubFontSize() * 0.8}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]}; top: 65%; left: 60%;">
        Oscillo
    </div>
</DefaultPage>
<style>
    .borderBox{
        border-radius: 5px;
        border: solid red 1px;
        position: absolute;
        top:50%;
        left:50%;
        min-width: 120px;
        min-height: 120px;
        width:5vw;
        height:5vw;
		display: flex;
        text-align:center;
	    align-items: center;
		justify-content: center;
        overflow: hidden; 
        white-space: nowrap;
        flex-direction:column;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
</style>