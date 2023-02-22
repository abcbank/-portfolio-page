<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>기능</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 덧셈<br/>
            - 뺄셈<br/>
            - 곱셈<br/>
            - 나눗셈<br/>
            - 팩토리얼<br/>
            - 제곱<br/>
            - 로그<br/>
            - 계산식<br/>
            - 소수 판별<br/>
            - 종료<br/>
        </p>
    </div>
</DefaultPage>