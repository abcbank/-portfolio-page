<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={head}>
    <p>Main Function</p>
</DefaultPage>