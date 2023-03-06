<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>차광도 표기</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 상단에서 광케이블을 통해 빛을 내고, 하단에<br/>
            &nbsp;&nbsp;위치한 포토센서로 빛이 차단된 정도 측정<br/>
            - 흑유리가 빛을 차광시키는 정도와 현재 차광된<br/>
            &nbsp;&nbsp;정도를 비교해 현재 용접면의 기능을 흑유리의<br/>
            &nbsp;&nbsp;차광도와 비교
            {:else}
            - 상단에서 광케이블을 통해 빛을 내고, 하단에 위치한 포토센서로 빛이 차단된<br/>
            &nbsp;&nbsp;정도 측정<br/>
            - 흑유리가 빛을 차광시키는 정도와 현재 차광된 정도를 비교해 현재 용접면의<br/>
            &nbsp;&nbsp;기능을 흑유리의 차광도와 비교
            {/if}
        </p>
    </div>
</DefaultPage>