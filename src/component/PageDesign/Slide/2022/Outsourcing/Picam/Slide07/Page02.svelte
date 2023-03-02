<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트를 마치며</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 어쩌다보니 갑자기 받게 된 외주<br/>
            - 원래 그 친구가 이런거 만들고 있는 건 알았는데 갑자기<br/>
            &nbsp;&nbsp;시연 3일 전에 만들어달라카더라...<br/>
            - 심지어 그때 주말에 약속도 있어서 진짜 개인 시간<br/>
            &nbsp;&nbsp;쪼개가며 만들어줬음
            {:else}
            - 어쩌다보니 갑자기 받게 된 외주<br/>
            - 원래 그 친구가 이런거 만들고 있는 건 알았는데 갑자기 시연 3일 전에 만들어달라카더라...<br/>
            - 심지어 그때 주말에 약속도 있어서 진짜 개인 시간 쪼개가며 만들어줬음
            {/if}
        </p>
    </div>
</DefaultPage>
<style>
</style>