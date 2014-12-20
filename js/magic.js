var Magic = function (options) {
    options = options || {};
    // Array to hold all active spells being drawn
    this.spells = [];

    // When on, wait a certain amount of time before casting (for initial
    // load-up)
    this.counting = options.counting || true;

    // The amount of time to wait (in number of animate() calls)
    this.waitTime = options.waitTime || 20;

    // How fast to draw the spells
    this.step = options.step || 0.2;

    // Limit of branches per spell at any time
    this.prune_to = options.prune_to || 20;

    // Max duration possible (in steps) of a spell
    this.maxDuration = options.maxDuration || 600;

    // Min duration possible (in steps) of a spell
    this.minDuration = options.minDuration || 50;

    // Max angle deviation during branch split
    this.maxAngleChange = options.maxAngleChange || 180;

    // Min angle deviation during branch split
    this.minAngleChange = options.minAngleChange || 90;

    // Average length of new spline (branch)
    this.splineLength = options.splineLength || 15;

    // Save this query here now that the page is loaded
    this.canvas = document.getElementById("magic");
};


/* Get the height and width of full document. To avoid browser
 * incompatibility issues, choose the maximum of all height/width values.
 *
 * Method from http://stackoverflow.com/a/1147768 */
Magic.prototype.getDocumentDimensions = function () {
    var body = document.body,
        html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight, 
                          html.clientHeight, html.scrollHeight,
                          html.offsetHeight);

    var width = Math.max(body.scrollWidth, body.offsetWidth, 
                         html.clientWidth, html.scrollWidth,
                         html.offsetWidth);
    
    return {"height": height, "width": width};
};

/* Specifies what will be added to the red, green, and blue values of the
 * color at each interval. */
Magic.prototype.pickGradient = function () {
    var directions = [-1, 0, 1];
    var magnitudes = [1, 2, 3];

    return {"r": directions[Math.floor(Math.random() * 3)] *
                 magnitudes[Math.floor(Math.random() * 3)],
            "g": directions[Math.floor(Math.random() * 3)] *
                 magnitudes[Math.floor(Math.random() * 3)],
            "b": directions[Math.floor(Math.random() * 3)] *
                 magnitudes[Math.floor(Math.random() * 3)]};
};

/* Alters the given color by the given gradient and returns both.

   If the red, green, or blue value of the color is at 0 or 255 and the
   gradient for that value is not zero, then the gradient for that value
   will change signs. 
   
   Unused for now. It turns out that changing the canvas stroke color is a
   costly operation and slows things down a lot. */
Magic.prototype.nextColor = function(color, gradient) {
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
};

/* Choose a random RGB color to begin the color gradient with */
Magic.prototype.pickRandomColor = function() {
    return {"r": Math.floor(Math.random() * (255 + 1)),
            "g": Math.floor(Math.random() * (255 + 1)),
            "b": Math.floor(Math.random() * (255 + 1))};
};

Magic.prototype.drawSplineSegment = function(branch, context) {
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
    context.lineTo(
        ax*Math.pow(branch.t+this.step, 3) + bx*Math.pow(branch.t+this.step, 2) + cx*(branch.t+this.step) + dx, 
        ay*Math.pow(branch.t+this.step, 3) + by*Math.pow(branch.t+this.step, 2) + cy*(branch.t+this.step) + dy
    );
    branch.t += this.step;
};

Magic.prototype.splitBranch = function(branch) {
    var newBranches = [];
    // Replace with 2 new branches
    for (var k = 0; k < 2; k++) {
        
        // Generate random deviation from previous angle
        var angle = branch.angle - (Math.random() * this.maxAngleChange - this.minAngleChange);
        
        // Generate random length
        var length = Math.random() * this.splineLength + 4;
        
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
};

Magic.prototype.cast = function(x, y, angle, chain) {
    // Find random position if not defined
    if (x === undefined) {
        x = Math.floor(Math.random() * (this.canvas.width + 1));
    }
    if (y === undefined) {
        y = Math.floor(Math.random() * (this.canvas.height + 1));
    }
    if (angle === undefined) {
        angle = Math.random() * 360;
    }

    var color = this.pickRandomColor();
    var colorString = "rgb(" + color.r + "," + color.g + "," + color.b + ")";

    // Create new spell (branch)
    this.spells.push({
        branches:new Array({
            points:new Array({x:x, y:y}, {x:x, y:y}, {x:x, y:y}, {x:x, y:y}), 
            angle:angle,
            t:0,
        }),
        color:colorString,
        duration:Math.floor(Math.random() * (this.maxDuration - this.minDuration + 1)) + 50,
        chain:chain,
    });
};

/* Most of this funtion is provided by Maissan Inc. in their tutorial:
   http://www.maissan.net/articles/simulating-vines */
 Magic.prototype.drawSpells = function(context, sort, prune, chain) {
    var AnimationFrame = window.AnimationFrame;
    AnimationFrame.shim();
    var animationFrame = new AnimationFrame(30),
        timeCounter = 0,
        color,
        gradient;
    context.lineWidth = 0.5;
    
    var self = this;
    function animate(time) {
        // resize canvas if document size changed
        dimensions = self.getDocumentDimensions();
        if ((dimensions.height !== self.canvas.height) ||
            (dimensions.width !== self.canvas.width)) {
            self.canvas.height = dimensions.height;
            self.canvas.width = dimensions.width;
        }

        // if enough time has passed, cast another spell to draw
        if (timeCounter >= self.waitTime && self.counting) {
            self.cast(undefined, undefined, undefined, chain); // start position
            self.counting = false;
        }

        // Draw branches
        for (var i in self.spells) {
            context.beginPath();
            context.strokeStyle = self.spells[i].color;

            if (self.spells[i].duration > 0) {
                for (var j in self.spells[i].branches) {
                    self.drawSplineSegment(self.spells[i].branches[j], context);

                    // When finished drawing splines, create a new set of branches
                    if (self.spells[i].branches[j].t >= 1) {       
                        
                        var newBranches = self.splitBranch(self.spells[i].branches[j]);
                        
                        // Replace old branch with two new branches
                        self.spells[i].branches.splice(j, 1);
                        self.spells[i].branches = self.spells[i].branches.concat(newBranches);
                    }
                }

                // If over 10 branches, prune the branches
                if (prune) {
                    if (sort) {
                        while (self.spells[i].branches.length > self.prune_to) {
                            self.spells[i].branches.pop();
                        }
                    } else {
                        while (self.spells[i].branches.length > self.prune_to) {
                            self.spells[i].branches.splice(
                                    Math.floor(Math.random() * self.spells[i].branches.length),
                                    1);
                        }   
                    }
                }

                context.stroke();
                context.closePath();
                self.spells[i].duration--;

            } else {
                // cast a new spell at random position
                if (self.spells[i].chain) {
                    self.cast(undefined, undefined, undefined, true);
                }
                self.spells.splice(i, 1); // spell is done now
            }
        }
        
        if (self.counting) {
            timeCounter++;
        }
        frameId = animationFrame.request(animate);
    }

    // Drawing interval
    var frameId = animationFrame.request(animate);
    return frameId;
};

Magic.prototype.canvasClickHandler = function(event) {
    var x = event.pageX;
    var y = event.pageY;
    
    this.cast(x, y, undefined, false);
};

Magic.prototype.draw = function() {
    var interval_time = 2000;

    // Initialize canvas
    var dimensions = this.getDocumentDimensions();
    this.canvas.height = dimensions.height;
    this.canvas.width = dimensions.width;

    // Check for canvas support, bind click event, and get context
    if (this.canvas.getContext){
        var self = this;
        this.canvas.addEventListener("click", function () { self.canvasClickHandler.apply(self, arguments); });

        var context = this.canvas.getContext("2d");

        // Cast magic spells
        var frameId = this.drawSpells(context, false, true, true);
    }
};
