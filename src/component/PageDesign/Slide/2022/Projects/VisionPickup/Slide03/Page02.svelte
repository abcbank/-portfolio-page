<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>헬리오스 카메라</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 일반적인 이미지 카메라를 통해 제품을 탐색하는<br/>
            &nbsp;&nbsp;것은 무리가 있다고 판단<br/>
            - TOF 카메라를 통해 제품을 탐색하는 것으로 결정<br/>
            - 여러 제품이 모여 있을 경우, 각 제품은<br/>
            &nbsp;&nbsp;약간이라도 위상의 차이가 존재<br/>
            - TOF 카메라를 통해 위상의 차이를 인식해<br/>
            &nbsp;&nbsp;제품들을 분리 <br/>
            - 다만, 빛을 통해 위상을 구하는 알고리즘은<br/>
            &nbsp;&nbsp;색상에 의해 노이즈가 발생하므로, 이를<br/>
            &nbsp;&nbsp;고려한 알고리즘 고안 
            {:else}
            - 일반적인 이미지 카메라를 통해 제품을 탐색하는 것은 무리가 있다고 판단<br/>
            - TOF 카메라를 통해 제품을 탐색하는 것으로 결정<br/>
            - 여러 제품이 모여 있을 경우, 각 제품은 약간이라도 위상의 차이가 존재<br/>
            - TOF 카메라를 통해 위상의 차이를 인식해 제품들을 분리<br/>
            - 다만, 빛을 통해 위상을 구하는 알고리즘은 색상에 의해 노이즈가 발생하므로,<br/>
            &nbsp;&nbsp;이를 고려한 알고리즘 고안 
            {/if}
        </p>
    </div>
</DefaultPage>