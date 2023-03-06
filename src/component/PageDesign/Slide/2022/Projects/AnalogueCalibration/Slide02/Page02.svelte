<script>
    import { Device } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let head = 2;
    export let subhead = 1.5;
    export let context = 1;
</script>

<DefaultPage color={color} fontSize={subhead}>
    <p>프로젝트 목적</p>
    <div style="font-size:{context}rem; text-align:left; margin-top:20px;">
        <p>
            {#if $Device["isSmallScreen"]}
            - 용접면을 생산하는 과정에서, 가변저항을<br/>
            &nbsp;&nbsp;정확하게 조정할 수 있도록 보조해주는<br/>
            &nbsp;&nbsp;장비 제작<br/>
            - 사용자는 UI의 차광도를 확인해 현재 가변저항<br/>
            &nbsp;&nbsp;값이 적합한지 판단<br/>
            - 양산장비로, 기존 하청 업체에 납품했던 장비를<br/>
            &nbsp;&nbsp;업그레이드해 의뢰주에게 납품
            {:else}
            - 용접면을 생산하는 과정에서, 가변저항을 정확하게 조정할 수 있도록 보조해주는 장비 제작<br/>
            - 사용자는 UI의 차광도를 확인해 현재 가변저항 값이 적합한지 판단<br/>
            - 양산장비로, 기존 하청 업체에 납품했던 장비를 업그레이드해 의뢰주에게 납품
            {/if}
        </p>
    </div>
</DefaultPage>

<style>
    
</style>