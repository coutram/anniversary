let particles = [];
let goldenRatio = (1 + Math.sqrt(5)) / 2;
let time = 0;

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100, 1);
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(50, 10, 95);
    
    // Update and display particles
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
    
    // Draw golden anniversary text
    push();
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(45, 80, 80);
    noStroke();
    text("50 Years of Love", width/2, height - 50);
    pop();
    
    time += 0.01;
}

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(5, 15);
        this.speed = random(0.5, 2);
        this.angle = random(TWO_PI);
        this.hue = random(30, 50); // Golden hues
        this.alpha = random(0.3, 0.8);
    }
    
    update() {
        // Create flowing motion using noise
        this.angle = noise(this.x * 0.01, this.y * 0.01, time) * TWO_PI;
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;
        
        // Reset if off screen
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.reset();
        }
    }
    
    display() {
        // Draw particle
        noStroke();
        fill(this.hue, 80, 80, this.alpha);
        ellipse(this.x, this.y, this.size);
        
        // Draw connecting lines to nearby particles
        for (let other of particles) {
            let d = dist(this.x, this.y, other.x, other.y);
            if (d < 100) {
                stroke(this.hue, 80, 80, this.alpha * 0.3);
                line(this.x, this.y, other.x, other.y);
            }
        }
    }
} 