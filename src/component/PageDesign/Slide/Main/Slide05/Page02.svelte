<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={context}>
    <p>이제 포트폴리오 보시는 법을 모두 설명 드렸네요!</p>
</DefaultPage>