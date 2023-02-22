<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>소수 판별</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 입력된 숫자가 소수인지 판별<br/>
        </p>
    </div>
</DefaultPage>