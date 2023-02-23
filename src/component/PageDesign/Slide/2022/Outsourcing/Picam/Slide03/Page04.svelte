<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>음성 연결(미구현)</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 앱의 기능 중 하나로, 자택에 있는 반려동물에게<br/>
            &nbsp;&nbsp;내가 말하는 것을 전달<br/>
            - 반려동물과 통화한다는 느낌
            {:else}
            - 앱의 기능 중 하나로, 자택에 있는 반려동물에게 내가 말하는 것을 전달<br/>
            - 반려동물과 통화한다는 느낌
            {/if}
        </p>
    </div>
</DefaultPage>