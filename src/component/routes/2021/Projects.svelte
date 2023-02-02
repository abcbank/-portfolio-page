<script>
	import { season } from "../../../global"
    import { fade } from "svelte/transition"
    import DefaultPage from "../../PageDesign/DefaultPage.svelte"
    import Slide01 from "../../PageDesign/Slide/Projects/2021/Slide01.svelte"
    import Slide02 from "../../PageDesign/Slide/Projects/2021/Slide02.svelte"
    import Slide03 from "../../PageDesign/Slide/Projects/2021/Slide03.svelte"
    import Slide04 from "../../PageDesign/Slide/Projects/2021/Slide04.svelte"
	
	
    const foreColor = {
        "Spring": "#000",
        "Summer": "#000",
        "Fall": "#fff",
        "Winter": "#fff"
    }
    const backColor = {
        "Summer": "transparent",
        "Spring": "transparent",
        "Fall": "transparent",
        "Winter": "transparent"
    }
    const btnBackColor = {
        "Spring": "#000",
        "Summer": "#000",
        "Fall": "#fff",
        "Winter": "#fff"
    }
    const btnBdrColor = {
        "Spring": "#fff",
        "Summer": "#fff",
        "Fall": "#000",
        "Winter": "#000"
    }
    const btnSelectedColor = {
        "Spring": "#000",
        "Summer": "#000",
        "Fall": "#fff",
        "Winter": "#fff"
    }
</script>
<div
    in:fade={{delay:200, duration: 200,}} 
    out:fade={{duration: 200,}}>
    <DefaultPage 
        
        slides={[
            { childComponent:Slide01, bg: backColor[$season], color: foreColor[$season], buttonBackColor: btnBackColor[$season], buttonBorderColor: btnBdrColor[$season], buttonSelectedColor: btnSelectedColor[$season]},
            { childComponent:Slide02, bg: backColor[$season], color: foreColor[$season], buttonBackColor: btnBackColor[$season], buttonBorderColor: btnBdrColor[$season], buttonSelectedColor: btnSelectedColor[$season]},
            { childComponent:Slide03, bg: backColor[$season], color: foreColor[$season], buttonBackColor: btnBackColor[$season], buttonBorderColor: btnBdrColor[$season], buttonSelectedColor: btnSelectedColor[$season]},
            { childComponent:Slide04, bg: backColor[$season], color: foreColor[$season], buttonBackColor: btnBackColor[$season], buttonBorderColor: btnBdrColor[$season], buttonSelectedColor: btnSelectedColor[$season]}
        ]}>
    </DefaultPage>
</div>

<style>
</style>