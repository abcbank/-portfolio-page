<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
    export let curPage

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead} bind:curPage={curPage}>
    <div style="position:absolute; top:5%; width:100%;">
        <p>구성 요소</p>
    </div>
    <div class="borderBox" 
        on:click={()=> {curPage = 3}} on:keydown={()=>{}}
        style="font-size:{context}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]}; top: {$Device['isMobile'] ? "30%" : "35%"}; left: {$Device['isMobile'] ? "32.5%" : "40%"};">
        Box<br/>Convyer
    </div>
    <div class="borderBox" 
    on:click={()=> {curPage = 4}} on:keydown={()=>{}}
        style="font-size:{context}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]}; top: {$Device['isMobile'] ? "30%" : "35%"}; left: {$Device['isMobile'] ? "67.5%" : "60%"};">
        Product<br/>Convyer
    </div>
    <div class="borderBox" 
    on:click={()=> {curPage = 6}} on:keydown={()=>{}}
        style="font-size:{context}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]}; top: {$Device['isMobile'] ? "60%" : "65%"}; left: {$Device['isMobile'] ? "32.5%" : "40%"};">
        PLC
    </div>
    <div class="borderBox" 
    on:click={()=> {curPage = 7}} on:keydown={()=>{}}
        style="font-size:{context}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]}; top: {$Device['isMobile'] ? "60%" : "65%"}; left: {$Device['isMobile'] ? "67.5%" : "60%"};">
        PC
    </div>
</DefaultPage>
<style>
    .borderBox{
        border-radius: 5px;
        border: solid red 1px;
        position: absolute;
        top:50%;
        left:50%;
        min-width: 70px;
        min-height: 70px;
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