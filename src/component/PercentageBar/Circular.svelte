<script>
	export let Options = [
        { "Name" : "OptionA", "Percent" : 20, "Backcolor" : "#000"},
        { "Name" : "OptionB", "Percent" : 20, "Backcolor" : "#000"},
        { "Name" : "OptionC", "Percent" : 20, "Backcolor" : "#000"},
        { "Name" : "OptionD", "Percent" : 20, "Backcolor" : "#000"},
        { "Name" : "OptionE", "Percent" : 20, "Backcolor" : "#000"}
    ];

	const angle = 360 * progress
	
	// Adapt the logic according to the approach
	const	background = `radial-gradient(white 50%, transparent 51%),
    conic-gradient(transparent 0deg ${angle}deg, gainsboro ${angle}deg 360deg),
    conic-gradient(orange 0deg, yellow 90deg, lightgreen 180deg, green);`;
	
	$: cssVarStyles = `--background:${background}`
</script>

<div id="progress-circle" style="{cssVarStyles}">
    {$each}
</div>

<style>
#progress-circle {
  background: var(--background);
  border-radius: 50%;
  width: 120px;
  height: 120px;
	transition: all 500ms ease-in;
	will-change: transform;
}
</style>