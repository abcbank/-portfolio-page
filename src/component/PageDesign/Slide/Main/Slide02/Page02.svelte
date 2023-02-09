<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'
    import { onMount } from 'svelte'
    import { fade } from "svelte/transition"

    export let color = "transparent";
    export let fontSize = 2
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>이 홈페이지는 이렇게 슬라이드와 페이지,<br/>두가지 방식으로 구성했답니다.</p>
</DefaultPage>