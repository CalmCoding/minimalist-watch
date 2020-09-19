class Clock {
    constructor(x, y, radius, time = [12, 0, 0]) {
        this.x = x
        this.y = y
        this.radius = radius

        this.ticks = new Ticks(x, y, radius, 20)

        const hour = time[0] % 12
        const minute = time[1]
        const second = time[2]

        this.hourPointer = new Pointer(
            x, y,
            radius * 0.55, 20, 18,
            12 * 60 * 60 * 1000)
        this.hourPointer.set(hour + (minute / 60.0) + (second / 60.0 / 60.0), 0, 12)

        this.minutePointer = new Pointer(
            x, y,
            radius * 0.85, 20, 15,
            60 * 60 * 1000)
        this.minutePointer.set(minute + (second / 60.0), 0, 59)

        this.secondPointer = new Pointer(
            x, y,
            radius * 0.95, [255, 0, 0], 5,
            60 * 1000)
        this.secondPointer.set(second, 0, 59)
    }

    update() {
        this.hourPointer.update()
        this.minutePointer.update()
        this.secondPointer.update()
    }

    draw() {
        ellipseMode(CENTER)
        fill(255)
        noStroke()
        circle(this.x, this.y, this.radius * 2)

        this.ticks.draw()
        this.hourPointer.draw()
        this.minutePointer.draw()
        this.secondPointer.draw()
    }
}

class Pointer {
    constructor(x, y, radius, color, width, millisForOneTurn) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.width = width
        this.millisForOneTurn = millisForOneTurn
        this.angle = 90
    }

    set(value, min, max) {
        this.angle = map(value, min, max, 180, 540)
    }

    update() {
        const steps = 360.0 / this.millisForOneTurn
        const angleIncrease = deltaTime * steps
        this.angle += angleIncrease
    }

    draw() {
        stroke(this.color)
        strokeWeight(this.width)
        angleMode(DEGREES)

        push()
        translate(this.x, this.y)
        rotate(this.angle)
        line(0, 0, 0, this.radius)
        pop()
    }
}

class Ticks {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        angleMode(DEGREES)
        strokeCap(PROJECT)
        stroke(this.color)
        strokeWeight(6)

        // hours
        const tickWidthHours = this.radius * 0.1
        for (let hour = 12; hour <= 24; hour++) {
            const angle = map(hour, 12, 24, 0, 360)
            push()
            translate(this.x, this.y)
            rotate(angle)
            line(0, this.radius - tickWidthHours,
                0, this.radius + tickWidthHours)
            pop()
        }

        // minutes
        const tickWidthMinutes = this.radius * 0.05
        for (let minute = 0; minute <= 60; minute++) {
            const angle = map(minute, 0, 60, 0, 360)
            push()
            translate(this.x, this.y)
            rotate(angle)
            line(0, this.radius - tickWidthMinutes,
                0, this.radius + tickWidthMinutes)
            pop()
        }
    }
}