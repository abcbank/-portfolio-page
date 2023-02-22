<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>위키피디아의 부정확성</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 위키피디아의 일부 JC는 개통되지 않은 상태<br/>
            - 따라서 위치 등 추가 정보를 정확히 알 수 없음
        </p>
    </div>
</DefaultPage>
<style>
</style>