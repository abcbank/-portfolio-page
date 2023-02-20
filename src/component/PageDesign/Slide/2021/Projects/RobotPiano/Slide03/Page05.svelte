<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2
    
    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>곡의 분석 및 해석</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - 기본 알고리즘<br/>
            &nbsp;&nbsp;- 일정 길이 이상의 쉼표는 이동을 의미함<br/>
            &nbsp;&nbsp;- 하나의 위치에서 연주할 수 있는 건반은 제한됨<br/>
            &nbsp;&nbsp;- 연주할 수 없는 건반의 경우, 제일 가까운 건반을 연주<br/>
            &nbsp;&nbsp;- 두 로봇팔의 안전거리를 확보하기 위해, 높은 음자리의<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;경우 기본적으로 1옥타브를 올려서 연주<br/>
            &nbsp;&nbsp;- 두 로봇팔의 위치가 1옥타브하고도 3건반 이내인 경우가<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;있을 경우, 해당 곡은 연주를 제한<br/>
        </p>
    </div>
</DefaultPage>