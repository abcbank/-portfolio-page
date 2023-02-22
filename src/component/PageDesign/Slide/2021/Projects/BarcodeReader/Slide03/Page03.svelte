<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <h3>바코드 탐색</h3>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 바코드는 임의의 3차원 공간에 위치<br/>
            - 따라서 렌즈의 줌을 조절하며 3차원 공간을<br/>
            &nbsp;&nbsp;모두 탐색할 필요가 있음<br/>
            - 초기엔 서보 모터를 통해 직접 줌을 회전시키는<br/>
            &nbsp;&nbsp;방식으로 구현<br/>
            - 다만 해당 방식의 경우, 정확도가 떨어지므로<br/>
            &nbsp;&nbsp;키엔스의 제품을 구매해 사용<br/>
            - 키엔스 제품의 경우, 뱅크라는 개념이 존재<br/>
            - 쉽게 설명하면 각 뱅크는 사진 촬영을 위한<br/>
            &nbsp;&nbsp;설정값을 저장하는 공간<br/>
            - 키엔스 카메라 기능 중, 최대 10개의 뱅크를<br/>
            &nbsp;&nbsp;연속적으로 촬영하는 기능을 활용
            {:else}
            - 바코드는 임의의 3차원 공간에 위치<br/>
            - 따라서 렌즈의 줌을 조절하며 3차원 공간을 모두 탐색할 필요가 있음<br/>
            - 초기엔 서보 모터를 통해 직접 줌을 회전시키는 방식으로 구현<br/>
            - 다만 해당 방식의 경우, 정확도가 떨어지므로 키엔스의 제품을 구매해 사용<br/>
            - 키엔스 제품의 경우, 뱅크라는 개념이 존재<br/>
            - 쉽게 설명하면 각 뱅크는 사진 촬영을 위한 설정값을 저장하는 공간<br/>
            - 키엔스 카메라 기능 중, 최대 10개의 뱅크를 연속적으로 촬영하는 기능을 활용
            {/if}
        </p>
    </div>
</DefaultPage>