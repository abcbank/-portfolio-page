<script>
	import { Color, season } from "../../../global"
    import { fade } from "svelte/transition"
    import DefaultPage from "../../PageDesign/DefaultPage.svelte"
    import Slide01 from "../../PageDesign/Slide/Projects/2021/Slide01.svelte"
    import Slide02 from "../../PageDesign/Slide/Projects/2021/Slide02.svelte"
    import Slide03 from "../../PageDesign/Slide/Projects/2021/Slide03.svelte"
    import Slide04 from "../../PageDesign/Slide/Projects/2021/Slide04.svelte"
</script>
<div
    in:fade={{delay:200, duration: 200,}} 
    out:fade={{duration: 200,}}>
    <DefaultPage 
        slides={[
            { childComponent:Slide01, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide02, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide03, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide04, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]}
        ]}>
    </DefaultPage>
</div>

<style>
</style>