<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>박스 컨베이어</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 완성된 상자가 뒤에서 하나씩 로딩<br/>
            - 이렇게 완성된 상자는 일렬로 나열되어있다고<br/>
            &nbsp;&nbsp;가정<br/>
            - 나열된 상자를 정확히 하나씩 뺄 수 있는 구조<br/>
            &nbsp;&nbsp;제작
            {:else}
            - 완성된 상자가 뒤에서 하나씩 로딩<br/>
            - 이렇게 완성된 상자는 일렬로 나열되어있다고 가정<br/>
            - 나열된 상자를 정확히 하나씩 뺄 수 있는 구조 제작
            {/if}
        </p>
    </div>
</DefaultPage>