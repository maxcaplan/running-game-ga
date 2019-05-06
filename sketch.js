let Gen = 1
let score = 0
let blocks = []

const G = 2
let speed = 8

const minDist = 50
const rate = 0.60
let time = 0

let width = 600
const height = 250

var aNum = 40
var agents = []
var savedAgents = []

function setup() {
  width = windowWidth - 80
  let cnv = createCanvas(width, height);
  tf.setBackend('cpu');
  cnv.parent('game')

  let y = 0

  if (random(1) >= 0.75) {
    y = 40 + random(0, 40)
  }

  blocks.push({
    "x": width,
    "y": y
  })

  for (var i = 0; i < aNum; i++) {
    a = new Agent(height)
    agents.push(a)
  }
}

function draw() {
  background(220);

  noStroke()
  fill(80)

  //   draw generation
  textSize(32);
  text("Generation: " + Gen, 16, 40)

  //   draw floor
  rect(0, height - 20, width, 20)

  // draw agents
  for (let i = 0; i < agents.length; i++) {
    fill(10, 10, 250, 100)
    agents[i].draw()
    agents[i].move()
    agents[i].think(blocks)

    if (agents[i].checkCol(blocks)) {
      savedAgents.push(agents.splice(i, 1)[0]);
      // agents[i].kill()
      // agents.splice(i, 1)
    }
  }

  // Create new generation
  if (agents.length === 0) {
    nextGeneration();
    score = 0;
    blocks = [];
    Y = 0
    YV = 0
    time = frameCount
    let y = 0

    if (random(1) >= 0.75) {
      y = 40 + random(0, 40)
    }

    blocks.push({
      "x": width,
      "y": y
    })

  }

  fill(250, 100, 100)
  //   draw blocks
  for (var i = 0; i < blocks.length; i++) {
    rect(blocks[i].x, height - 50 - blocks[i].y, 40, 30)

    if (blocks[i].x <= 0) {
      blocks.shift()
    } else {
      blocks[i].x -= speed
    }
  }

  if (frameCount - time >= minDist) {
    time = frameCount

    if (random(1) >= rate) {
      let y = 0

      if (random(1) >= 0.75) {
        y = 40 + random(0, 40)
      }

      blocks.push({
        "x": width,
        "y": y
      })
    }
  }

  score += Math.ceil(frameCount / 100)
  if (speed < 19) {
    speed = (frameCount * 0.005) + 8
  }
}