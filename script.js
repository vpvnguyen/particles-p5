// particles does not use ES6, need to use standard functions
// will call draw and continuously run the function
let p; // initialize particle

// init array of particles
const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    console.log(`width: ${width}`)
    p = new Particle(); // create particle
    const particlesLength = Math.floor(window.innerWidth / 10)

    // iterate through all particles
    for (let i = 0; i < particlesLength; i++) {
        particles.push(new Particle())
    }
}

function draw() {
    background(55, 100, 144) // add background color to remove particle trail 
    p.update()
    // particle draw
    p.draw();

    particles.forEach((p, index) => {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index)) // 
    })

    // if (mouseIsPressed) {
    //     console.log(mouseX, mouseY)
    //     fill(0)
    // } else {
    //     fill(100)
    // }

    // plug x and y mouse pos to track circle to mouse
    // circle(mouseX, mouseY, 80)
}

class Particle {
    // method that will run when class is instantiated
    constructor() {
        // position of particle gets plotted randomly within the contraints of the current window size
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-2, 2), random(-2, 2)) // velocity of particle; random(left, right)
        this.size= 10;
    }

    // update particle for movement / defined by velocity
    update() {
        this.pos.add(this.vel) // take position and add velocity to update particle
        this.edges()
    }

    draw() {
        noStroke(); // no border
        fill('rgba(255, 255, 255, 0.1)') // fill in color
        circle(this.pos.x, this.pos.y, this.size); // draw circle by position and size
    }

    // detect edges by each side
    edges() {
        if (this.pos.x < 0 || this.pos.x > width) { // if pos touches left or right side
            this.vel.x *= -1 // turn particle around if limit is hit
        }
        if (this.pos.y < 0 || this.pos.y > height) { // if pos touches left or right side
            this.vel.y *= -1 // turn particle around if limit is hit
        }
    }

    // connect particles
    checkParticles(particles) {
        particles.forEach(particle => {
            // create distance taking in x and y property of pos and particular particle position
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)

            // create a line at a certain distance
            if (d < 120) { // if they are d apart, create a line
                stroke('rgba(255, 255, 255, 0.1)')
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
            }
        })
    }
}