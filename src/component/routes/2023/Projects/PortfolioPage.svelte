<script>
	import { Color, season } from "../../global"
    import DefaultPage from "../PageDesign/DefaultPage.svelte"
    import Slide01 from '../../../PageDesign/Slide/2023/Projects/Portfolio/Slide01.svelte'
    import Slide02 from '../../../PageDesign/Slide/2023/Projects/Portfolio/Slide02.svelte'
    import Slide03 from '../../../PageDesign/Slide/2023/Projects/Portfolio/Slide03.svelte'
    import Slide04 from '../../../PageDesign/Slide/2023/Projects/Portfolio/Slide04.svelte'
    import Slide05 from '../../../PageDesign/Slide/2023/Projects/Portfolio/Slide05.svelte'
    import Slide06 from '../../../PageDesign/Slide/2023/Projects/Portfolio/Slide06.svelte'
    import Slide07 from '../../../PageDesign/Slide/2023/Projects/Portfolio/Slide07.svelte'
    import { fade } from "svelte/transition"
	
</script>
<div
    in:fade={{delay:200, duration: 200,}} 
    out:fade={{duration: 200,}}>
    <DefaultPage 
        slides={[
            { childComponent:Slide01, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide02, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide03, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide04, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide05, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide06, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide07, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]}
        ]}>
    </DefaultPage>
</div>

<style>
</style>