<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
    export let curPage

    let CurPage = "main"
</script>

<DefaultPage color={color} fontSize={subhead} bind:curPage={curPage}>
    <div style="position:absolute; top:5%; width:100%;">
        <h3>구성 요소</h3>
    </div>
    <div class="borderBox" 
        on:click={()=> {curPage = 3}} on:keydown={()=>{}}
        style="font-size:{context}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]};top: 35%; left: {$Device['isMobile'] ? "15%" : "30%"};">
        Camera
    </div>
    <div class="borderBox" 
    on:click={()=> {curPage = 4}} on:keydown={()=>{}}
        style="font-size:{context}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]};top: 35%; left: {$Device['isMobile'] ? "50%" : "50%"};">
        Lense
    </div>
    <div class="borderBox" 
    on:click={()=> {curPage = 5}} on:keydown={()=>{}}
        style="font-size:{context}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]};top: 35%; left: {$Device['isMobile'] ? "85%" : "70%"};">
        Light<br/>
        Source
    </div>
    <div class="borderBox" 
    on:click={()=> {curPage = 6}} on:keydown={()=>{}}
        style="font-size:{context}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]};top: {$Device['isMobile'] ? "60%" : "75%"}; left: {$Device['isMobile'] ? "32.5%" : "40%"};">
        Robot<br/>Arm
    </div>
    <div class="borderBox" 
    on:click={()=> {curPage = 7}} on:keydown={()=>{}}
        style="font-size:{context}rem;border: solid {$Color["btnBdrColor"][$season]} 1px; background-color:{$Color["btnBackColor"][$season]}; color:{$Color["btnBdrColor"][$season]};top: {$Device['isMobile'] ? "60%" : "75%"}; left: {$Device['isMobile'] ? "67.5%" : "60%"};">
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