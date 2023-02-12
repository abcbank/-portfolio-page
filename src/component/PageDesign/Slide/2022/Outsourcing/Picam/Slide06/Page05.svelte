<script>
    import { Device, Color, season } from "../../../../../../../global"
    import DefaultPage from '../../../../defaultPage.svelte'

    export let color = "transparent";
    export let fontSize = 2;

    let CurPage = "main"

    console.log($Color["btnBackColor"][$season]);

    const calcSubFontSize = () => !$Device["isMobile"] ? fontSize : fontSize/2;
</script>

<DefaultPage color={color} fontSize={fontSize}>
    <p>Solution</p>
    <div style="font-size:{calcSubFontSize()}rem; text-align:left; margin-top:20px;">
        <p>
            - 대안 1: 라즈베리파이에서 연결된 인터넷 IP를 기준으로 http 서버를 엶<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;- 장점: 스크립트만 좀 수정하면 됨.<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;- 단점: 핫스팟이 아닌 다른 인터넷에 연결됐을 경우, 인지할 방법이 없음.<br/><br/>
            - 대안 2: 공유기를 통해 와이파이 통신 수행<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;- 장점: 정확하고 확실하게 연결 가능.<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;- 단점: 시연 시 공유기가 필수적으로 필요함.
        </p>
    </div>
</DefaultPage>
<style>
</style>