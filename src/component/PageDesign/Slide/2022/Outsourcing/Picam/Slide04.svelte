<script>
    import Page01 from "./Slide04/Page01.svelte";
    import Page02 from "./Slide04/Page02.svelte";
    import Page03 from "./Slide04/Page03.svelte";
    import Page04 from "./Slide04/Page04.svelte";
    import Page05 from "./Slide04/Page05.svelte";

    import DefaultSlide from "../../../defaultSlide.svelte";
    export let color;
    export let curPage;
    export let maxPage;

    let Pages =[
        { index: 1, component:Page01 }, 
        { index: 2, component:Page02 }, 
        { index: 3, component:Page03 }, 
        { index: 4, component:Page04 }, 
        { index: 5, component:Page05 }]
</script>

<DefaultSlide Pages={Pages} bind:curPage={curPage} bind:maxPage={maxPage} bind:color={color} />