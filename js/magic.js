window.onload = function () {

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
       will change signs. */
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

    /* Most of this funtion is provided by Maissan Inc. in their tutorial:
       http://www.maissan.net/articles/simulating-vines */
    function drawTendrils(context, x, y, interations, sort, prune, prune_to) {
        
        // Set stroke colour
        context.lineWidth = 0.5;
        var color = pickRandomColor();
        context.strokeStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";

        // Create initial branch
        var branches = [];
        branches.push({
            points:new Array({x:x, y:y}, {x:x, y:y}, {x:x, y:y}, {x:x, y:y}), 
            angle:0,
            //distanceToLattice:1000
        });
        
        // Start drawing splines at t=0
        var t = 0;
        
        // Drawing interval
        var interval = setInterval(function() {

            var gradient = pickGradient();

            // Set stroke color
            var newColor = nextColor(color, gradient);
            color = newColor.color;
            gradient = newColor.gradient;
            context.strokeStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
                
            // Draw branches
            for (var i in branches) {
                
                // Draw spline segment
                var ax = (-branches[i].points[0].x + 3*branches[i].points[1].x - 3*branches[i].points[2].x + branches[i].points[3].x) / 6;
                var ay = (-branches[i].points[0].y + 3*branches[i].points[1].y - 3*branches[i].points[2].y + branches[i].points[3].y) / 6;
                var bx = (branches[i].points[0].x - 2*branches[i].points[1].x + branches[i].points[2].x) / 2;
                var by = (branches[i].points[0].y - 2*branches[i].points[1].y + branches[i].points[2].y) / 2;
                var cx = (-branches[i].points[0].x + branches[i].points[2].x) / 2;
                var cy = (-branches[i].points[0].y + branches[i].points[2].y) / 2;
                var dx = (branches[i].points[0].x + 4*branches[i].points[1].x + branches[i].points[2].x) / 6;
                var dy = (branches[i].points[0].y + 4*branches[i].points[1].y + branches[i].points[2].y) / 6;
                context.beginPath();
                context.moveTo(
                    ax*Math.pow(t, 3) + bx*Math.pow(t, 2) + cx*t + dx, 
                    ay*Math.pow(t, 3) + by*Math.pow(t, 2) + cy*t + dy
                );
                context.lineTo(
                    ax*Math.pow(t+0.1, 3) + bx*Math.pow(t+0.1, 2) + cx*(t+0.1) + dx, 
                    ay*Math.pow(t+0.1, 3) + by*Math.pow(t+0.1, 2) + cy*(t+0.1) + dy
                );
                context.stroke();
                context.closePath();            
            }
            
            // Advance t
            t += 0.1;
            
            // When finished drawing splines, create a new set of branches
            if (t >= 1) {       
                
                // Create array to store next iteration of branchces
                var new_branches = [];
                
                // Iterate over each branch
                for (var j in branches) {
                    
                    // Replace with 2 new branches
                    for (var k = 0; k < 2; k++) {
                        
                        // Generate random deviation from previous angle
                        var angle = branches[j].angle - (Math.random() * 180 - 90);                 
                        
                        // Determine closest lattice point
                        //var distanceToLattice = 100000
                        //for (var l in lattice) {
                            //var result = distancePointToLine(branches[j].points[3], lattice[l]);
                            //if (result < distanceToLattice) distanceToLattice = result;
                        //}
                        
                        // Generate random length
                        var length = Math.random() * 15 + 4;
                        
                        // Calculate new point
                        var x2 = branches[j].points[3].x + Math.sin(Math.PI * angle / 180) * length;
                        var y2 = branches[j].points[3].y - Math.cos(Math.PI * angle / 180) * length;
                        
                        // Add to new branch array 
                        new_branches.push({
                            points:new Array(
                                branches[j].points[1],
                                branches[j].points[2],
                                branches[j].points[3],
                                {x:x2, y:y2}
                            ),
                            angle:angle,
                            //distanceToLattice:distanceToLattice
                        });

                    }
                }
                
                // Sort branches by distance to lattice
                //new_branches.sort(function(a, b) {
                    //return a.distanceToLattice - b.distanceToLattice;
                //});

                // If over 10 branches, prune the branches
                if (prune) {
                    if (sort) {
                        while (new_branches.length > 20) new_branches.pop();
                    } else {
                        while (new_branches.length > prune_to) {
                            new_branches.splice(Math.floor(Math.random() * new_branches.length), 1);
                        }   
                    }
                }
                
                // Replace old branch array with new
                branches = new_branches;
                
                // Restart drawing splines at t=0
                t = 0;
            }
            
            // Count interations
            interations--;
            if (interations < 0) clearInterval(interval);
                
        }, 16.67);
        
        // Return interval
        return interval;
    }


    function draw() {
        // Initialize canvas
        console.log("draw");
        var canvas = document.getElementById("magic");
        var dimensions = getDocumentDimensions();
        console.log(dimensions.height);
        console.log(dimensions.width);
        canvas.height = dimensions.height;
        canvas.width = dimensions.width;

        // Check for canvas support and get context
        if (canvas.getContext){
            var context = canvas.getContext("2d");

            // Cast magic spells
            var metaInterval = setInterval(function () {
                // resize canvas if document size changed
                dimensions = getDocumentDimensions();
                if ((dimensions.height !== canvas.height) ||
                    (dimensions.width !== canvas.width)) {
                    console.log(dimensions.height);
                    console.log(dimensions.width);
                    canvas.height = dimensions.height;
                    canvas.width = dimensions.width;
                }

                // Find random position
                var x = Math.floor(Math.random() * (canvas.width + 1));
                var y = Math.floor(Math.random() * (canvas.height + 1));
                var duration = Math.floor(Math.random() * (600 - 50 + 1)) + 50;
                var interval = drawTendrils(context, x, y, duration, false, true, 30);
            }, 3000);
        }
    }

    draw();
};
