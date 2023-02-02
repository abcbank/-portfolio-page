<script>
    import DefaultSlide from '../defaultSlide.svelte'
    export let color;
</script>

<DefaultSlide>
    <div class="context" style="color:{color};">
        <p>Main Slide 01</p>
    </div>
</DefaultSlide>

<style>
    .context{
        overflow: hidden; 
        white-space: nowrap;
    }
</style>