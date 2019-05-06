function nextGeneration() {
    console.log("next generation")
    calculateFitness();

    // temp
    // for (var i = 0; i < aNum; i++) {
    //     a = new Agent(height)
    //     agents.push(a)
    // }

    for (let i = 0; i < aNum; i++) {
        agents[i] = pickOne();
    }
    for (let i = 0; i < aNum; i++) {
        savedAgents[i].dispose();
    }
    savedAgents = [];

    Gen++
}

function pickOne() {
    // randomly pick agent based on fitness
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r = r - savedAgents[index].fitness;
        index++;
    }
    index--;
    let agent = savedAgents[index];
    let child = new Agent(height, agent.brain);
    child.mutate();
    return child;
}

function calculateFitness() {
    let sum = 0;
    let best
    for (let agent of savedAgents) {
        sum += agent.score;
    }
    for (let agent of savedAgents) {
        agent.fitness = agent.score / sum;

        if (!best || agent.fitness > best.fitness) {
            best = agent
        }
    }

    tf.tidy(() => {
        bestModel = best.brain
        let weights = bestModel.model.getWeights()
        let weightCopies = []
        for (let i = 0; i < weights.length; i++) {
            weightCopies[i] = weights[i].clone()
        }
        let arrWeights = []

        for (let i = 0; i < weights.length; i += 2) {

        }

        weightCopies[0].data().then(function (result) {
            arrWeights.push(result)
        }).then(weightCopies[2].data().then(function (result) {
            arrWeights.push(result)
        }).then(function () {
            bestWeights = arrWeights.reverse()
            createGraph()
        }))
    })
}

function createGraph() {
    model = [bestModel.input_nodes, bestModel.hidden_nodes, bestModel.output_nodes]
    model.reverse()

    points = []
    lines = []

    for (let i = 0; i < 3; i++) {
        let layer = []
        for (let j = 0; j < model[i]; j++) {
            const x = width - 20 - 200 * i
            const y = 20 + j * 30

            layer.push({ "x": x, "y": y })
        }
        points.push(layer)
    }

    for (let i = 0; i < points.length; i++) {
        let layer = []
        for (let j = 0; j < points[i].length; j++) {
            let x1 = points[i][j].x
            let y1 = points[i][j].y

            if (i < points.length - 1) {
                for (let k = 0; k < points[i + 1].length; k++) {
                    let x2 = points[i + 1][k].x
                    let y2 = points[i + 1][k].y
                    if (x2 != x1) {
                        let c = Math.abs(bestWeights[i][k]) * 255
                        layer.push({ "x1": x1, "x2": x2, "y1": y1, "y2": y2, "c": c })
                    }
                }
            }
        }
        if (layer.length > 0) {
            lines.push(layer)
        }

    }
}