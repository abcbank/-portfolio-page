<script>
    import Page01 from "./Slide05/Page01.svelte";
    import Page02 from "./Slide05/Page02.svelte";
    import Page03 from "./Slide05/Page03.svelte";
    import Page04 from "./Slide05/Page04.svelte";
    import Page05 from "./Slide05/Page05.svelte";
    import Page06 from "./Slide05/Page06.svelte";
    import Page07 from "./Slide05/Page07.svelte";
    import Page08 from "./Slide05/Page08.svelte";
    import Page09 from "./Slide05/Page09.svelte";
    import Page10 from "./Slide05/Page10.svelte";
    import Page11 from "./Slide05/Page11.svelte";
    import Page12 from "./Slide05/Page12.svelte";

    import DefaultSlide from "../../../defaultSlide.svelte";
    export let color;
    export let curPage;
    export let maxPage;

    let Pages =[
        { index: 1, component:Page01 }, 
        { index: 2, component:Page02 }, 
        { index: 3, component:Page03 }, 
        { index: 4, component:Page04 }, 
        { index: 5, component:Page05 }, 
        { index: 6, component:Page06 }, 
        { index: 7, component:Page07 }, 
        { index: 8, component:Page08 }, 
        { index: 9, component:Page09 }, 
        { index: 10, component:Page10 }, 
        { index: 11, component:Page11 }, 
        { index: 12, component:Page12 }]
</script>

<DefaultSlide Pages={Pages} bind:curPage={curPage} bind:maxPage={maxPage} bind:color={color} />