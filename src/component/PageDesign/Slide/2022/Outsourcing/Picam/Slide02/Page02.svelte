<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 목적</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            - 반려 동물들은 반려인들이 집에 없을때 외로움을 느끼는 경우가 많음<br/>
            - 따라서 반려 동물들이 반려인이 집에 없을때 외로움을 덜 타도록 보조해주는 장비 제작
        </p>
    </div>
</DefaultPage>

<style>
    
</style>