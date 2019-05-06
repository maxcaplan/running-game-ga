let score = 0
let blocks = []

const G = 2
let speed = 8

const minDist = 50
const rate = 0.60
let time = 0

const width = 600
const height = 250

var aNum = 10
var agents = []

function setup() {
  let cnv = createCanvas(width, height);
  cnv.parent('game')

  blocks.push({
    "x": width
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

  //   draw score
  textSize(32);
  text(score, 16, 40)

  //   draw floor
  rect(0, height - 20, width, 20)

  // draw agents
  fill(10, 10, 250, 100)

  for (let i = 0; i < agents.length; i++) {
    agents[i].draw()
    agents[i].move()
    agents[i].think(blocks)

    if (agents[i].checkCol(blocks)) {
      agents[i].kill()
      agents.splice(i, 1)
    }
  }

  fill(250, 100, 100)
  //   draw blocks
  for (var i = 0; i < blocks.length; i++) {
    rect(blocks[i].x, height - 50, 40, 30)

    if (blocks[i].x <= 0) {
      blocks.shift()
    } else {
      blocks[i].x -= speed
    }
  }

  if (frameCount - time >= minDist) {
    time = frameCount

    if (random(1) >= rate) {
      blocks.push({
        "x": width
      })
    }
  }

  score += Math.ceil(frameCount / 100)
  if (speed < 19) {
    speed = (frameCount * 0.005) + 8
  }
}

// function kill() {
//   score = 0
//   blocks = []
//   Y = 0
//   YV = 0
//   time = frameCount
//   blocks.push({
//     "x": width
//   })
// }