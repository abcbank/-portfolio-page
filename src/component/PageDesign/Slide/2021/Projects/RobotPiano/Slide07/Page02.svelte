<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트를 마치며</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 사실상 2021년의 가장 메인 프로젝트<br/>
            - 사실상 로봇을 처음으로 제어 시도<br/>
            - 결과물도 나쁘지 않게 나왔지만, 백화점 측에서<br/>
            &nbsp;&nbsp;엎어버리는 바람에 실질적으로 팔진 못함<br/>
            - 2022년까지 우려먹다 결국은 대표님 기억의 저편으로<br/>
            &nbsp;&nbsp;사라짐<br/>
            - 사실 대표님께서도 하드 코딩으로 연주하는 것 정도만<br/>
            &nbsp;&nbsp;기대하고 계셨다는 카더라 소문이 있음<br/>
            - 초기엔 하드웨어 메인으로 진행하는 프로젝트였지만,<br/>
            &nbsp;&nbsp;언제부턴가 이것저것 기능을 추가하다보니 소프트웨어쪽이<br/>
            &nbsp;&nbsp;메인이 되버림<br/>
            - 개인적으론 연주에 감정을 넣을 수 있는 방법을 추가하면<br/>
            &nbsp;&nbsp;여러모로 이슈가 될만한 프로젝트라 판단함<br/>
            - 추가 개발시 가장 핵심은 연주에 감정을 싣는 것, 즉 세기<br/>
            &nbsp;&nbsp;조절이라 생각함.
            {:else}
            - 사실상 2021년의 가장 메인 프로젝트<br/>
            - 사실상 로봇을 처음으로 제어 시도<br/>
            - 결과물도 나쁘지 않게 나왔지만, 백화점 측에서 엎어버리는 바람에 실질적으로<br/>
            &nbsp;&nbsp;팔진 못함<br/>
            - 2022년까지 우려먹다 결국은 대표님 기억의 저편으로 사라짐<br/>
            - 사실 대표님께서도 하드 코딩으로 연주하는 것 정도만 기대하고 계셨다는<br/>
            &nbsp;&nbsp;카더라 소문이 있음<br/>
            - 초기엔 하드웨어 메인으로 진행하는 프로젝트였지만, 언제부턴가 이것저것 기능을<br/>
            &nbsp;&nbsp;추가하다보니 소프트웨어쪽이 메인이 되버림<br/>
            - 개인적으론 연주에 감정을 넣을 수 있는 방법을 추가하면 여러모로 이슈가 될만한<br/>
            &nbsp;&nbsp;프로젝트라 판단함<br/>
            - 추가 개발시 가장 핵심은 연주에 감정을 싣는 것, 즉 세기 조절이라 생각함.
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>