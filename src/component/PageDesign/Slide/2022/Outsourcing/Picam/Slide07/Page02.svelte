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
            - 재미있어보여 하게된 프로젝트<br/>
            - 사실상 헐값에 과제 대행을 하긴 했으나, 만드는<br/>
            &nbsp;&nbsp;재미는 있었으니 만족함<br/>
            - 오래간만에 새로운 api와 툴을 사용해봐서<br/>
            &nbsp;&nbsp;보람찼다고 생각함<br/>
            - 사실 도착 예정 시간을 계산할때 현재 도로의<br/>
            &nbsp;&nbsp;상황을 고려해 연산하고 싶었으나, 출장과 겹쳐<br/>
            &nbsp;&nbsp;못한게 아쉽긴 함
            {:else}
            - 재미있어보여 하게된 프로젝트<br/>
            - 사실상 헐값에 과제 대행을 하긴 했으나, 만드는 재미 하나는 확실했음<br/>
            - 오래간만에 새로운 api와 툴을 사용해봐서 보람찼다고 생각함<br/>
            - 사실 도착 예정 시간을 계산할때 현재 도로의 상황을 고려해 연산하고 싶었으나, 출장과<br/>
            &nbsp;&nbsp;겹쳐 못한게 아쉽긴 함
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>