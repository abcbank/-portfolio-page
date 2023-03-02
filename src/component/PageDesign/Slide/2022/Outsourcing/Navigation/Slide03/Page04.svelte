<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>데이터 가공</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 크롤링한 데이터를 고속도로에 대한 데이터로<br/>
            &nbsp;&nbsp;가공<br/>
            - 즉, 어떤 고속도로에 어떤 JC들이 속해있는지 <br/>
            &nbsp;&nbsp;위주로 데이터 가공
            {:else}
            - 크롤링한 데이터를 고속도로에 대한 데이터로 가공<br/>
            - 즉, 어떤 고속도로에 어떤 JC들이 속해있는지 위주로 데이터 가공
            {/if}
        </p>
    </div>
</DefaultPage>