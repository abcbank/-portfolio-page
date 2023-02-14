<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>반려 동물 상태 분석(미구현)</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - AI가 촬영된 영상을 통해 상태를 분석<br/>
            - 상태에 대한 보고서는 반려인이 확인 가능
        </p>
    </div>
</DefaultPage>