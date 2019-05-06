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
    for (let agent of savedAgents) {
        sum += agent.score;
    }
    for (let agent of savedAgents) {
        agent.fitness = agent.score / sum;
    }
}