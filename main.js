const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

const x = 150
const y = 300
const d = 15
const color = "red"

const hero = {x: 100, y: innerHeight/2, d: 50, color: 'green'}

document.body.append(canvas)

updateCanvasSize()

drawCircle(x, y, d, color)

window.onresize = updateCanvasSize

window.onmousemove = e => {
  clearCanvas()
  drawCircle(e.x, e.y, d, color)
}

function updateCanvasSize() {
  canvas.width = innerWidth
  canvas.height = innerHeight
}

function drawCircle(x, y, d, color) {
  ctx.beginPath()
  ctx.arc(x, y, d/2, 0, 7)
  ctx.fillStyle = color
  ctx.fill()
}

function clearCanvas() {
  ctx.clearRect(0, 0, innerWidth, innerHeight)
}