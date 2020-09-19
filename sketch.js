let clock

function setup() {
    createCanvas(550, 550)
    const now = new Date()
    clock = new Clock(
        width / 2,
        height / 2,
        250, [now.getHours(), now.getMinutes(), now.getSeconds()])
}

function draw() {
    background(20)

    clock.update()
    clock.draw()
}