<script>
    import Page01 from "./Slide06/Page01.svelte";
    import Page02 from "./Slide06/Page02.svelte";

    import DefaultSlide from "../../../defaultSlide.svelte";
    export let color;
    export let curPage;
    export let maxPage;

    let Pages =[
        { index: 1, component:Page01 },
        { index: 2, component:Page02 }]
</script>

<DefaultSlide Pages={Pages} bind:curPage={curPage} bind:maxPage={maxPage} bind:color={color} />