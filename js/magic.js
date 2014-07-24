window.onload = function () {

    // Array to hold all active spells being drawn
    var spells = [];
    
    // Save this query here now that the page is loaded
    var canvas = document.getElementById("magic");

    /* Get the height and width of full document. To avoid browser
     * incompatibility issues, choose the maximum of all height/width values.
     *
     * Method from http://stackoverflow.com/a/1147768 */
    function getDocumentDimensions() {
        var body = document.body,
            html = document.documentElement;

        var height = Math.max(body.scrollHeight, body.offsetHeight, 
                              html.clientHeight, html.scrollHeight,
                              html.offsetHeight);

        var width = Math.max(body.scrollWidth, body.offsetWidth, 
                             html.clientWidth, html.scrollWidth,
                             html.offsetWidth);
        
        return {"height": height, "width": width};
    }

    /* Specifies what will be added to the red, green, and blue values of the
     * color at each interval. */
    function pickGradient() {
        var directions = [-1, 0, 1];
        var magnitudes = [1, 2, 3];

        return {"r": directions[Math.floor(Math.random() * 3)] *
                     magnitudes[Math.floor(Math.random() * 3)],
                "g": directions[Math.floor(Math.random() * 3)] *
                     magnitudes[Math.floor(Math.random() * 3)],
                "b": directions[Math.floor(Math.random() * 3)] *
                     magnitudes[Math.floor(Math.random() * 3)]};
    }

    /* Alters the given color by the given gradient and returns both.

       If the red, green, or blue value of the color is at 0 or 255 and the
       gradient for that value is not zero, then the gradient for that value
       will change signs. 
       
       Unused for now. It turns out that changing the canvas stroke color is a
       costly operation and slows things down a lot. */
    function nextColor(color, gradient) {
        var values = ["r", "g", "b"];

        // Check if color at end of range and reverse gradient direction if so
        for (var i = 0; i < 3; i++) {
            var colorValue = color[values[i]];
            var gradientValue = gradient[values[i]];
            if ((colorValue === 255 && gradientValue > 0) ||
                    (colorValue === 0 && gradientValue < 0)) {
                gradient[values[i]] = gradientValue * -1;
            }
        }

        // Modify the color according to the gradient
        for (i = 0; i < 3; i++) {
            color[values[i]] = color[values[i]] + gradient[values[i]];
        }

        return {"color": color, "gradient": gradient};
    }

    /* Choose a random RGB color to begin the color gradient with */
    function pickRandomColor() {
        return {"r": Math.floor(Math.random() * (255 + 1)),
                "g": Math.floor(Math.random() * (255 + 1)),
                "b": Math.floor(Math.random() * (255 + 1))};
    }

    function drawSplineSegment(branch, context) {
        var ax = (-branch.points[0].x + 3*branch.points[1].x - 3*branch.points[2].x + branch.points[3].x) / 6;
        var ay = (-branch.points[0].y + 3*branch.points[1].y - 3*branch.points[2].y + branch.points[3].y) / 6;
        var bx = (branch.points[0].x - 2*branch.points[1].x + branch.points[2].x) / 2;
        var by = (branch.points[0].y - 2*branch.points[1].y + branch.points[2].y) / 2;
        var cx = (-branch.points[0].x + branch.points[2].x) / 2;
        var cy = (-branch.points[0].y + branch.points[2].y) / 2;
        var dx = (branch.points[0].x + 4*branch.points[1].x + branch.points[2].x) / 6;
        var dy = (branch.points[0].y + 4*branch.points[1].y + branch.points[2].y) / 6;
        context.moveTo(
            ax*Math.pow(branch.t, 3) + bx*Math.pow(branch.t, 2) + cx*branch.t + dx, 
            ay*Math.pow(branch.t, 3) + by*Math.pow(branch.t, 2) + cy*branch.t + dy
        );
        //var step = (branch.t * -0.15) + 0.2;
        var step = 0.2;
        context.lineTo(
            ax*Math.pow(branch.t+step, 3) + bx*Math.pow(branch.t+step, 2) + cx*(branch.t+step) + dx, 
            ay*Math.pow(branch.t+step, 3) + by*Math.pow(branch.t+step, 2) + cy*(branch.t+step) + dy
        );
        branch.t += step;
    }

    function splitBranch(branch) {
        var newBranches = [];
        // Replace with 2 new branches
        for (var k = 0; k < 2; k++) {
            
            // Generate random deviation from previous angle
            var angle = branch.angle - (Math.random() * 180 - 90);                 
            
            // Generate random length
            var length = Math.random() * 15 + 4;
            
            // Calculate new point
            var x2 = branch.points[3].x + Math.sin(Math.PI * angle / 180) * length;
            var y2 = branch.points[3].y - Math.cos(Math.PI * angle / 180) * length;
            
            // Add to new branch array 
            newBranches.push({
                points:new Array(
                    branch.points[1],
                    branch.points[2],
                    branch.points[3],
                    {x:x2, y:y2}
                ),
                angle:angle,
                t:0,
            });

        }
        return newBranches;
    }

    function cast(x, y, angle) {
        // Find random position if not defined
        if (x === undefined) {
            x = Math.floor(Math.random() * (canvas.width + 1));
        }
        if (y === undefined) {
            y = Math.floor(Math.random() * (canvas.height + 1));
        }
        if (angle === undefined) {
            angle = Math.random() * 360;
        }

        var color = pickRandomColor();
        var colorString = "rgb(" + color.r + "," + color.g + "," + color.b + ")";

        // Create new spell (branch)
        spells.push({
            branches:new Array({
                points:new Array({x:x, y:y}, {x:x, y:y}, {x:x, y:y}, {x:x, y:y}), 
                angle:angle,
                t:0,
            }),
            color:colorString,
            duration:Math.floor(Math.random() * (600 - 50 + 1)) + 50,
        });
    }

    /* Most of this funtion is provided by Maissan Inc. in their tutorial:
       http://www.maissan.net/articles/simulating-vines */
    function drawSpells(context, sort, prune, prune_to) {
        var AnimationFrame = window.AnimationFrame;
        AnimationFrame.shim();
        var animationFrame = new AnimationFrame(30),
            timeCounter = 0,
            waitTime = 50,
            lastCast = 0,
            color,
            gradient;
        context.lineWidth = 0.5;
        
        function animate(time) {
            // resize canvas if document size changed
            dimensions = getDocumentDimensions();
            if ((dimensions.height !== canvas.height) ||
                (dimensions.width !== canvas.width)) {
                canvas.height = dimensions.height;
                canvas.width = dimensions.width;
            }

            // if enough time has passed, cast another spell to draw
            if (timeCounter <= 15000 && (timeCounter - lastCast) >= waitTime) {
                if (waitTime === 50) {
                    waitTime = 200;
                } else if (waitTime < 300) {
                    waitTime = waitTime * 1.1;
                }

                lastCast = timeCounter;
                if (waitTime === 200) {
                    cast(5, 5, 270); // start position
                } else {
                    cast(undefined, undefined, undefined); // random spell position
                }
            }

            // Draw branches
            for (var i in spells) {
                context.beginPath();
                context.strokeStyle = spells[i].color;

                if (spells[i].duration > 0) {
                    for (var j in spells[i].branches) {
                        drawSplineSegment(spells[i].branches[j], context);

                        // When finished drawing splines, create a new set of branches
                        if (spells[i].branches[j].t >= 1) {       
                            
                            var newBranches = splitBranch(spells[i].branches[j]);
                            
                            // Replace old branch with two new branches
                            spells[i].branches.splice(j, 1);
                            spells[i].branches = spells[i].branches.concat(newBranches);
                        }
                    }

                    // If over 10 branches, prune the branches
                    if (prune) {
                        if (sort) {
                            while (spells[i].branches.length > prune_to) {
                                spells[i].branches.pop();
                            }
                        } else {
                            while (spells[i].branches.length > prune_to) {
                                spells[i].branches.splice(
                                        Math.floor(Math.random() * spells[i].branches.length),
                                        1);
                            }   
                        }
                    }

                    context.stroke();
                    context.closePath();
                    spells[i].duration--;

                } else {
                    spells.splice(i, 1); // spell is done now
                }
            }
            
            timeCounter++;
            frameId = animationFrame.request(animate);
        }

        // Drawing interval
        var frameId = animationFrame.request(animate);
        return frameId;
    }

    function canvasClickHandler(event) {
        var x = event.pageX;
        var y = event.pageY;
        
        cast(x, y, undefined);
    }

    function draw() {
        var interval_time = 2000;

        // Initialize canvas
        var dimensions = getDocumentDimensions();
        canvas.height = dimensions.height;
        canvas.width = dimensions.width;

        // Check for canvas support, bind click event, and get context
        if (canvas.getContext){
            canvas.addEventListener("click", canvasClickHandler);

            var context = canvas.getContext("2d");

            // Cast magic spells
            var frameId = drawSpells(context, false, true, 30);
        }
    }

    draw();
};
