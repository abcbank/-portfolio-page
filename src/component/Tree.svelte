<script>    
	import { season } from "../global"
    import { onMount } from 'svelte'

    var requestAnimationFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / 16);
        };
    })();

    export let location;

    var growth_rate = 2;
    var maximum_bend = 90 / 180 * Math.PI;
    var smallest_branch = 40 + 10 * Math.random();
    var hue = 360 * Math.random();
    var fps;
    var canvas;
    var ctx;

    var avgTime = 0;
    var frameCounter = 0;
    var trackFrames = 150;

    var canvasWidth = 1000;
    var canvasHeight = 800;
    var Scale = 1
    var LandOffset = 40 * Math.random();
    var trees = [];

    var StopTrigger = true;

    function each(array, fn, i) {
        var idx = 0,
            len = array.length;

        for (; idx < len; idx++) {
            fn(array[idx], i);
        }
    }

    function hsl(lightness) {
        return 'hsl(' + hue + ',70%,' + lightness + '%)';
    }

    function plant_tree(i) {
        var l = 60,
            thickness = 16 + 20 * Math.random(),
            theta = -0.5 + Math.random(),
            origin = {
                x: canvas.width / 2,
                y: canvas.height - LandOffset
            };
        var mag = 100
        trees[i] = {
            magnitude: mag, 
            branches: [create_branch(origin, mag, thickness, theta, l)]
            };
    }

    function update(i) {
        each(trees[i].branches, grow_branch, i);
    }

    function draw(ctx, i) {

        each(trees[i].branches, function(branch, i) {
            var w = branch.thickness;
            var oX1 = branch.origin.x - w;
            var oX2 = branch.origin.x + w;
            var oY = branch.origin.y;
            var tX1 = branch.tip.x - w * 0.8;
            var tX2 = branch.tip.x + w * 0.8;
            var tY = branch.tip.y;
            var cpX1 = (oX1 + oX1 + tX1) / 3;
            var cpY1 = (oY + tY + tY) / 3;
            var cpX2 = (oX2 + oX2 + tX2) / 3;
            var cpY2 = (oY + tY + tY) / 3;
            ctx.beginPath();
            ctx.moveTo(oX1, oY);
            ctx.quadraticCurveTo(cpX1, cpY1, tX1, tY);
            ctx.lineTo(tX2, tY);
            ctx.quadraticCurveTo(cpX2, cpY2, oX2, oY);
            ctx.lineWidth = 1;
            ctx.fillStyle = hsl(branch.lightness);
            ctx.fill();
        });
    }

    function grow_branch(branch, i) {
        if (branch.done) return;

        var x = (branch.tip.x - branch.origin.x);
        var y = (branch.tip.y - branch.origin.y);
        var h = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

        if (h >= branch.magnitude) {
            branch.done = true;

            if (branch.magnitude < smallest_branch) return;
            shoot(branch, i);

            return;
        }

        branch.tip.x = branch.tip.x + (Math.sin(branch.theta) * growth_rate);
        branch.tip.y = branch.tip.y - (Math.cos(branch.theta) * growth_rate);
    }

    function shoot(branch, i) {
        if (branch.sprouts <= 0) return;
        branch.sprouts -= 1;
        shoot(branch, i);

        var theta2 = branch.theta + (Math.random() * maximum_bend - maximum_bend / 2);
        var magnitude2 = branch.magnitude * (Math.random() * 0.2 + 0.7);
        var lightness2 = branch.lightness * 0.9;
        trees[i].branches.push(create_branch({
            x: branch.tip.x,
            y: branch.tip.y
        }, magnitude2, branch.thickness * 0.6, theta2, lightness2));
    }

    function create_branch(origin, magnitude, thickness, theta, lightness) {
        return {
            origin: origin,
            thickness: thickness,
            theta: theta,
            magnitude: magnitude,
            tip: {
                x: origin.x,
                y: origin.y
            },
            lightness: lightness,
            sprouts: ((Math.random() * 4) + 1) >>> 0
        };
    }

    function loop(onFrame) {

        var startDate = new Date();
        
        for(let i = 0; i < trees.length; i++){
            update(i);
            draw(ctx, i);

            var endDate = new Date();
            var duration = (endDate - startDate);
            avgTime += duration;
        }

        if($season == "Fall")
            requestAnimationFrame(loop);
        else{
            return;
        }
    }

    onMount(async () => {

        ctx = canvas.getContext('2d');
        fps = 150;
        ctx.lineCap = 'square';

        plant_tree(0);
        plant_tree(1);
        plant_tree(2);

        loop();
    })

    function toTop(i)
    {
        return i - (canvasHeight - 40) / 2   * Scale / document.body.clientHeight * 100;
    }

</script>
<canvas class="Tree" bind:this="{canvas}" width={canvasWidth} height={canvasHeight} style="left:{location[0]}%; top:{toTop(location[1])}%; transform: translate(-50%, -50%) scale({Scale});">
</canvas>

<style>
    .Tree{
        position: absolute;
        background:transparent;
        transform: translate(-50%, -50%) scale(0.6);
    }
</style>