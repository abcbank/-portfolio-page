<script>
    import Page01 from "./Slide03/Page01.svelte";
    import Page02 from "./Slide03/Page02.svelte";
    import Page03 from "./Slide03/Page03.svelte";
    import Page04 from "./Slide03/Page04.svelte";
    import Page05 from "./Slide03/Page05.svelte";
    import Page06 from "./Slide03/Page06.svelte";
    import Page07 from "./Slide03/Page07.svelte";
    import Page08 from "./Slide03/Page08.svelte";
    import Page09 from "./Slide03/Page09.svelte";
    import Page10 from "./Slide03/Page10.svelte";
    import Page11 from "./Slide03/Page11.svelte";
    import Page12 from "./Slide03/Page12.svelte";
    import Page13 from "./Slide03/Page13.svelte";
    import Page14 from "./Slide03/Page14.svelte";
    import Page15 from "./Slide03/Page15.svelte";
    import Page16 from "./Slide03/Page16.svelte";
    import Page17 from "./Slide03/Page17.svelte";
    import Page18 from "./Slide03/Page18.svelte";
    import Page19 from "./Slide03/Page19.svelte";
    import Page20 from "./Slide03/Page20.svelte";
    import Page21 from "./Slide03/Page21.svelte";
    import Page22 from "./Slide03/Page22.svelte";

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
        { index: 12, component:Page12 },
        { index: 13, component:Page13 },
        { index: 14, component:Page14 },
        { index: 15, component:Page15 },
        { index: 16, component:Page16 },
        { index: 17, component:Page17 },
        { index: 18, component:Page18 },
        { index: 19, component:Page19 },
        { index: 20, component:Page20 },
        { index: 21, component:Page21 },
        { index: 22, component:Page22 }
    ]
</script>

<DefaultSlide Pages={Pages} bind:curPage={curPage} bind:maxPage={maxPage} bind:color={color} />