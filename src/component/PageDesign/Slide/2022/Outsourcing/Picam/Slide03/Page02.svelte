<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>카메라 촬영</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - 장비에 부착된 파이 카메라를 통해 반려 동물의 상태 확인<br/>
            - 버튼을 통해 카메라의 각도를 좌우로 회전 가능<br/>
            - AI를 통해 반려 동물의 이동 경로를 따라 카메라의 각도도 회전(미구현)
        </p>
    </div>
</DefaultPage>