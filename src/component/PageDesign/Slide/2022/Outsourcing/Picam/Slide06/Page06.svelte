<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>핫스팟에 대한 특이점</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 기존 핫스팟을 통해 서버를 열고, 이를 휴대폰 혹은<br/>
            &nbsp;&nbsp;노트북으로 접속해 시연하는 방식으로 진행
            - 휴대폰의 핫스팟을 다시 켤때마다 IP주소가 변경된다는<br/>
            &nbsp;&nbsp;사실을 간과
            - 실제 시연장에서 한차례 핫스팟의 IP주소가 변경되어,<br/>
            &nbsp;&nbsp;라즈베리파이가 제대로 서버를 열지 못하는 문제 발생
            {:else}
            - 기존 핫스팟을 통해 서버를 열고, 이를 휴대폰 혹은 노트북으로 접속해 시연하는 방식으로 진행
            - 휴대폰의 핫스팟을 다시 켤때마다 IP주소가 변경된다는 사실을 간과
            - 실제 시연장에서 한차례 핫스팟의 IP주소가 변경되어, 라즈베리파이가 제대로 서버를 열지 못하는 문제 발생
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>