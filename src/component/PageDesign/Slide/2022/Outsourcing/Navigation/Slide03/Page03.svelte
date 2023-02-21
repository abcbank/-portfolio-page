<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>위치 특정</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 카카오맵 api를 활용해 각 JC들의 위도, 경도<br/>
            &nbsp;&nbsp;좌표 특정<br/>
            - 카카오맵에 각각 JC를 검색하고, 결과가 나오는<br/>
            &nbsp;&nbsp;경우 해당 JC는 실제로 존재하는 JC로 판단,<br/>
            &nbsp;&nbsp;위도, 경도 데이터를 긁어옴
            {:else}
            - 카카오맵 api를 활용해 각 JC들의 위도, 경도 좌표 특정<br/>
            - 카카오맵에 각각 JC를 검색하고, 결과가 나오는 경우 해당 JC는<br/>
            &nbsp;&nbsp;실제로 존재하는 JC로 판단, 위도, 경도 데이터를 긁어옴
            {/if}
        </p>
    </div>
</DefaultPage>