<script>
    import DefaultSlide from '../../defaultSlide.svelte'
    export let color;
</script>

<DefaultSlide>
    <div class="context" style="color:{color};">
        <p>2022 Outsourcing Slide 03</p>
    </div>
</DefaultSlide>

<style>
    .context{
        overflow: hidden; 
        white-space: nowrap;
    }
</style>