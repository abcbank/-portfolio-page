<script>
    import { Device } from "../../../../../global"
    import DefaultPage from '../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color}>
    <p style="font-size: {context}rem;">나름 이것저것 넣어 꾸며봤답니다</p>
</DefaultPage>