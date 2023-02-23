<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>간식 던져주기</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 모터를 사용해 내장된 간식을 반려동물에게 던져줌
        </p>
    </div>
</DefaultPage>