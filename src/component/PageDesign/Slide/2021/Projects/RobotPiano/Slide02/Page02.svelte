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
            {#if $Device["isMobile"]}
            - 롯데 백화점과 얘기가 나왔던 프로젝트<br/>
            - 신규 백화점을 오픈하며 4차 산업 혁명을<br/>
            &nbsp;&nbsp;주제로 획기적인 쇼가 필요하단 요구에<br/>
            &nbsp;&nbsp;제작 시작<br/>
            - 기존 목표는 로봇팔을 이용해 기타를 연주하는<br/>
            &nbsp;&nbsp;것이었음<br/>
            - 그러나 기타줄의 탄성을 고려했을 경우, 위치를<br/>
            &nbsp;&nbsp;확신할 수 없는 기타줄을 정밀하게 연주하는<br/>
            &nbsp;&nbsp;것은 힘들다 판단<br/>
            - 이에 따라, 각 건반의 위치가 확실한 피아노를<br/>
            &nbsp;&nbsp;로봇팔로 연주하도록 설계
            {:else}
            - 롯데 백화점과 얘기가 나왔던 프로젝트<br/>
            - 신규 백화점을 오픈하며 4차 산업 혁명을 주제로 획기적인 쇼가<br/>
            &nbsp;&nbsp;필요하단 요구에 제작 시작<br/>
            - 기존 목표는 로봇팔을 이용해 기타를 연주하는 것이었음<br/>
            - 그러나 기타줄의 탄성을 고려했을 경우, 위치를 확신할 수<br/>
            &nbsp;&nbsp;없는 기타줄을 정밀하게 연주하는 것은 힘들다 판단<br/>
            - 이에 따라, 각 건반의 위치가 확실한 피아노를 로봇팔로<br/>
            &nbsp;&nbsp;연주하도록 설계
            {/if}
        </p>
    </div>
</DefaultPage>