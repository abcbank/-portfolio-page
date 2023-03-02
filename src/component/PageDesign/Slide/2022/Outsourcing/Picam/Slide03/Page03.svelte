<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
    console.log($Device["isMobile"])
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>간식 던져주기</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 모터를 사용해 내장된 간식을 반려동물에게<br/>
            &nbsp;&nbsp;던져줌
            {:else}
            - 모터를 사용해 내장된 간식을 반려동물에게 던져줌
            {/if}
        </p>
    </div>
</DefaultPage>