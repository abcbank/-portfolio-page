<script>
	import { season } from "../../global"
    import DefaultPage from "../PageDesign/DefaultPage.svelte"
    import Slide01 from '../PageDesign/Slide/Main/Slide01.svelte'
    import Slide02 from '../PageDesign/Slide/Main/Slide02.svelte'
    import Slide03 from '../PageDesign/Slide/Main/Slide03.svelte'
    import Slide04 from '../PageDesign/Slide/Main/Slide04.svelte'
    import { fade } from "svelte/transition"
	
	
    let foreColor = {
        "Spring": "#000",
        "Summer": "#000",
        "Fall": "#fff",
        "Winter": "#fff"
    }
    let backColor = {
        "Summer": "transparent",
        "Spring": "transparent",
        "Fall": "transparent",
        "Winter": "transparent"
    }
</script>
<div
    in:fade={{delay:200, duration: 200,}} 
    out:fade={{duration: 200,}}>
    <DefaultPage 
        
        slides={[
            { childComponent:Slide01, bg: backColor[$season], color: foreColor[$season]},
            { childComponent:Slide02, bg: backColor[$season], color: foreColor[$season]},
            { childComponent:Slide03, bg: backColor[$season], color: foreColor[$season]},
            { childComponent:Slide04, bg: backColor[$season], color: foreColor[$season]}
        ]}>
    </DefaultPage>
</div>

<style>
</style>