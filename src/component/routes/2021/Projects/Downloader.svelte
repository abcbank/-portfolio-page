<script>
	import { Color, season } from "../../../../global"
    import { fade } from "svelte/transition"
    import DefaultPage from "../../../PageDesign/DefaultPage.svelte"
    import Slide01 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide01.svelte"
    import Slide02 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide02.svelte"
    import Slide03 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide03.svelte"
    import Slide04 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide04.svelte"
    import Slide05 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide05.svelte"
    import Slide06 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide06.svelte"
    import Slide07 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide07.svelte"
    import Slide08 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide08.svelte"
    import Slide09 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide09.svelte"
    import Slide10 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide09.svelte"
    import Slide11 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide10.svelte"
    import Slide12 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide11.svelte"
    import Slide13 from "../../../PageDesign/Slide/2021/Projects/Downloader/Slide12.svelte"
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
            { childComponent:Slide07, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide08, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide09, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide10, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide11, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide12, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]},
            { childComponent:Slide13, bg: $Color["backColor"][$season], color: $Color["foreColor"][$season], buttonBackColor: $Color["btnBackColor"][$season], buttonBorderColor: $Color["btnBdrColor"][$season], buttonSelectedColor: $Color["btnSelectedColor"][$season]}
        ]}>
    </DefaultPage>
</div>

<style>
</style>