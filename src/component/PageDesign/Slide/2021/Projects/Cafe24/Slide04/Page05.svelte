<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>Solution</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 구글님께선 답을 알고 계신다...★
        </p>
    </div>
</DefaultPage>
<style>
</style>