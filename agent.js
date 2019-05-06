class Agent {
    constructor(h, brain) {
        this.Y = 0
        this.YV = 0
        this.fitness
        this.score

        // todo: remove this.height
        this.height = h

        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(4, 6, 2);
        }
    }

    draw() {
        rect(80, this.height - 60 - this.Y, 40, 40)
    }

    move() {
        this.Y += this.YV

        if (this.Y > 0) {
            this.YV -= G
        }

        if (this.Y < 0) {
            this.Y = 0
            this.YV = 0
        }
    }

    jump() {
        if (this.Y == 0) {
            this.YV = 20
        }
    }

    checkCol(blocks) {
        let block = blocks.find(e => e.x >= 80 && e.x <= 120)

        if (block) {
            // console.log(blocks.indexOf(block))
            // element = blocks[blocks.indexOf(block)]
            if (this.Y >= block.y && this.Y <= block.y + 40) {
                return true
            } else {
                this.score = score
                return false
            }
        } else {
            this.score = score
        }

        // if (blocks.some(e => e.x >= 80 && e.x <= 120)) {
        //     if(this.Y <= e.y && this.Y >= e.y - 40) {
        //         return true
        //     } else {
        //         return false
        //     }
        // } else {
        //     this.score = score
        // }
    }

    mutate() {
        this.brain.mutate()
    }

    think(blocks) {
        // find closest block
        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < blocks.length; i++) {
            let d = blocks[i].x - 120;
            if (d < closestD && d > 0) {
                closest = blocks[i];
                closestD = d;
            }
        }

        // create array of input values
        const inputs = []
        // 1. distance to block
        inputs[0] = closestD
        // 2. Y Position
        inputs[1] = this.Y
        // 3. Y Velocity
        inputs[2] = this.YV
        // 4. closest blocks y
        if (closest) {
            inputs[3] = closest.y
        } else {
            inputs[3] = Infinity
        }

        // pass in values to brain and predict to jump or not
        let outputs = this.brain.predict(inputs)
        // if output 1 > output 2 then jump
        if (outputs[0] > outputs[1]) {
            this.jump()
        }
    }

    dispose() {
        this.brain.dispose()
    }
}