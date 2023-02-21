<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} >
    <p fontSize={context}>
        다만 일부 배경의 경우, 사양에 따라
        <br/>
        렉이 걸릴 수 있습니다</p>
</DefaultPage>