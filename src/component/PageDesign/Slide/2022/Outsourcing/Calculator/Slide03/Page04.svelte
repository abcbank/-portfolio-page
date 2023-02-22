<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>로그 연산</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 입력된 숫자에 대해 로그 연산 수행<br/>
        </p>
    </div>
</DefaultPage>