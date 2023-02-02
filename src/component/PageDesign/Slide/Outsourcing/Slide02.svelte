<script>
    import DefaultSlide from '../defaultSlide.svelte'
    export let color;
</script>

<DefaultSlide>
    <div class="context" style="color:{color};">
        <p>Outsourcing Slide 02</p>
    </div>
</DefaultSlide>

<style>
    .context{
        overflow: hidden; 
        white-space: nowrap;
    }
</style>