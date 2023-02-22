<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>Solution</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 이 부분 또한 얘기가 됐다고 전달받음<br/>
            - 근데 또 얘기가 제대로 안됐었네...?
        </p>
    </div>
</DefaultPage>
<style>
</style>