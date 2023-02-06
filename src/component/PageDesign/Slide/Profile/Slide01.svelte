<script>
    import DefaultSlide from '../defaultSlide.svelte'
    import { Device } from '../../../../global.js'
    export let color;
</script>

<DefaultSlide>
    <div class="context" style="color:{color};">
        <p>Profile Slide 01</p>
    </div>
</DefaultSlide>

<style>
    .context{
        overflow: hidden; 
        white-space: nowrap;
    }
</style>