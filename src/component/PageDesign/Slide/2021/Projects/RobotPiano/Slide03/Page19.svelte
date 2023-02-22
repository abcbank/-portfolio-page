<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>
<DefaultPage color={color} fontSize={subhead}>
    <p>기타 기능 추가</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 영상 / 음원 재생 기능<br/>
            - 플레이 리스트 기능<br/>
            - 반복 재생 기능<br/>
            - 곡 제어의 유동성 추가
        </p>
    </div>
</DefaultPage>