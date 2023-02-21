<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>촬영 영역 지정</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isMobile"]}
            - 바코드가 존재할 수 있는 위치를 지정<br/>
            - 제품의 크기, 바코드의 위치 및 형태는 다양하므로<br/>
            &nbsp;&nbsp;사실상 3차원에 임의의 공간에 바코드가<br/>
            &nbsp;&nbsp;존재한다고 간주<br/>
            - 바코드는 반드시 카메라를 향해 위치
            {:else}
            - 바코드가 존재할 수 있는 위치를 지정<br/>
            - 제품의 크기, 바코드의 위치 및 형태는 다양하므로 사실상 3차원에 임의의<br/>
            &nbsp;&nbsp;공간에 바코드가 존재한다고 간주<br/>
            - 바코드는 반드시 카메라를 향해 위치
            {/if}
        </p>
    </div>
</DefaultPage>