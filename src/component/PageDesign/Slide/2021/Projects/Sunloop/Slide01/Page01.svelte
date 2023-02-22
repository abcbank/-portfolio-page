<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;

    console.log(head);
</script>

<DefaultPage color={color} fontSize={head}>
    <h1>Sunloop Vision</h1>
</DefaultPage>