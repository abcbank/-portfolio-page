<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>고속도로 연결 상태 정의</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 고속도로는 1자형으로 생겼다고 가정<br/>
            - 즉, 제일 먼 두 JC는 고속도로의 양 끝점(A,Z)으로<br/>
            &nbsp;&nbsp;가정<br/>
            - 한쪽 끝(A)에서 가장 가까이 위치한 JC(B)는 서로<br/>
            &nbsp;&nbsp;연결되어 있다고 가정<br/>
            - 해당 JC(B)와 가장 가까이 위치한 JC(C)는 서로<br/>
            &nbsp;&nbsp;연결되어 있다고 가정<br/>
            - 이를 다른쪽 끝 JC가 나올때까지 반복<br/>
            - 이를 통해 고속도로의 연결 상태를 짐작 가능
            {:else}
            - 고속도로는 1자형으로 생겼다고 가정<br/>
            - 즉, 제일 먼 두 JC는 고속도로의 양 끝점(A,Z)으로 가정<br/>
            - 한쪽 끝(A)에서 가장 가까이 위치한 JC(B)는 서로 연결되어 있다고 가정<br/>
            - 해당 JC(B)와 가장 가까이 위치한 JC(C)는 서로 연결되어 있다고 가정<br/>
            - 이를 다른쪽 끝 JC가 나올때까지 반복<br/>
            - 이를 통해 고속도로의 연결 상태를 짐작 가능
            {/if}
        </p>
    </div>
</DefaultPage>