<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export const head = 2;
    export const subhead = 1.5;
    export const context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>비전에 대한 이해</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallSreen"]}
            - 카메라 등으로 촬영된 사진을 가공해 원하는<br/>
            &nbsp;&nbsp;데이터를 뽑아내는 작업을 비전이라 함<br/>
            - 단, 렌즈에 의한 굴절과 이미지 센서의 미세한<br/>
            &nbsp;&nbsp;위치 오차로 인해 현실계와 사진의 데이터는<br/>
            &nbsp;&nbsp;완전히동일하지 않음.<br/>
            - 이렇게 발생하는 각종 오차들을 모두 보정하면<br/>
            &nbsp;&nbsp;이미지와 현실계를 얼추 동일시할 수 있음.<br/>
            - 사실상 비전에서 가장 핵심적인 요소는 위의<br/>
            &nbsp;&nbsp;오차들을 최소한으로 줄이는 작업임.
            {:else}
            - 카메라 등으로 촬영된 사진을 가공해 원하는 데이터를 뽑아내는 작업을<br/>
            &nbsp;&nbsp;비전이라 함<br/>
            - 단, 렌즈에 의한 굴절과 이미지 센서의 미세한 위치 오차로 인해 현실계와<br/>
            &nbsp;&nbsp;사진의 데이터는 완전히 동일하지 않음.<br/>
            - 이렇게 발생하는 각종 오차들을 모두 보정하면 이미지와 현실계를 얼추<br/>
            &nbsp;&nbsp;동일시할 수 있음.<br/>
            - 사실상 비전에서 가장 핵심적인 요소는 위의 오차들을 최소한으로 줄이는 작업임.
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>