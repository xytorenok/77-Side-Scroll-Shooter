const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

colorInput.oninput = () => {
  hero.color = colorInput.value
}

const hero = { x: 100, y: innerHeight / 2, d: 500, color: 'blue' }
const enemyTemplate = { d: 60, color: 'red', speed: 400 }
const spawnDelay = 1

let enemies = []

let deltaTime, lastFrameTime = 0
let lastSpawnTime = 0

document.body.append(canvas)

updateCanvasSize()

animate(0)

window.onresize = updateCanvasSize

window.onmousemove = e => {
  let { x, y } = e

  if (x > innerWidth / 2) x = innerWidth / 2
  if (x < hero.d / 2) x = hero.d / 2
  if (y > innerHeight - hero.d / 2) y = innerHeight - hero.d / 2
  if (y < hero.d / 2) y = hero.d / 2

  Object.assign(hero, { x, y })
}

function drawCircle({ x, y, d, color }) {
  ctx.beginPath()
  ctx.arc(x, y, d / 2, 0, 7)
  ctx.fillStyle = color
  ctx.fill()
}

function spawnEnemy() {
  const enemy = { x: innerWidth * 2, y: Math.random() * innerHeight, ...enemyTemplate }

  enemies.push(enemy)
}

function animate(time) {
  requestAnimationFrame(animate)
  
  if (time - lastSpawnTime > spawnDelay * 1000) {
    lastSpawnTime += spawnDelay * 1000
    
    spawnEnemy()
  }
  
  deltaTime = time - lastFrameTime
  lastFrameTime = time
  
  updatePosition(deltaTime)

  clearCanvas()
  drawCircle(hero)
  enemies.forEach(drawCircle)

  checkCollision()

  if (checkCollision()) hero.d--

  if(hero.d <= 0) location.reload()
}

function checkCollision(){
  return enemies.some(enemy => Math.hypot(enemy.x - hero.x, enemy.y - hero.y) < hero.d/2 + enemy.d/2)
}

function updatePosition(deltaTime) {
  const trash = []

  enemies.forEach(enemy => {
    enemy.x -= enemy.speed/1000 * deltaTime

    if (enemy.x < -innerWidth) {
      trash.push(enemy)
      console.log('bam')
    }
  })

  enemies = enemies.filter(enemy => !trash.includes(enemy))
}

function clearCanvas() {
  ctx.clearRect(0, 0, innerWidth, innerHeight)
}

function updateCanvasSize() {
  canvas.width = innerWidth
  canvas.height = innerHeight
}
