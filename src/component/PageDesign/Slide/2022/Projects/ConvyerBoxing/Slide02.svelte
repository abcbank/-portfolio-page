<script>
    import Page01 from "./Slide02/Page01.svelte";
    import Page02 from "./Slide02/Page02.svelte";
    import Page03 from "./Slide02/Page03.svelte";
    import DefaultSlide from "../../../defaultSlide.svelte";
    export let color;
    export let curPage;
    export let maxPage;

    let Pages =[
        { index: 1, component:Page01 }, 
        { index: 2, component:Page02 }, 
        { index: 3, component:Page03 }]
    let Pages =[
        { index: 1, component:Page01 }, 
        { index: 2, component:Page02 }, 
        { index: 3, component:Page03 }]
</script>

<DefaultSlide Pages={Pages} bind:curPage={curPage} bind:maxPage={maxPage} bind:color={color} />