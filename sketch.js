let particles = [];
let familyParticles = [];
let goldenRatio = (1 + Math.sqrt(5)) / 2;
let time = 0;
let poemLines = [
    "Fifty years of love and grace,",
    "A journey filled with joy's embrace.",
    "Two sons raised with love so true,",
    "Now men of honor, strong and new.",
    "Their chosen partners, hearts aligned,",
    "Four grandchildren, blessings combined.",
    "A family tree that's grown so wide,",
    "With love and laughter as your guide."
];

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100, 1);
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Create family particles
    // Parents (2)
    familyParticles.push(new FamilyParticle(width/2, height/2, 20, 45, 1, "Parents"));
    // Sons and wives (4)
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 100, 15, 40, 2, "Son 1"));
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 150, 15, 40, 2, "Wife 1"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 100, 15, 40, 2, "Son 2"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 150, 15, 40, 2, "Wife 2"));
    // Grandchildren (4)
    familyParticles.push(new FamilyParticle(width/2 - 150, height/2 - 200, 10, 35, 3, "Grandchild 1"));
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 200, 10, 35, 3, "Grandchild 2"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 200, 10, 35, 3, "Grandchild 3"));
    familyParticles.push(new FamilyParticle(width/2 + 150, height/2 - 200, 10, 35, 3, "Grandchild 4"));
}

function draw() {
    background(50, 10, 95);
    
    // Update and display background particles
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
    
    // Display family particles and connections
    for (let particle of familyParticles) {
        particle.display();
    }
    
    // Draw connecting lines between family members
    drawFamilyConnections();
    
    // Draw poem
    drawPoem();
    
    time += 0.01;
}

function drawPoem() {
    push();
    textAlign(CENTER);
    textSize(16);
    fill(45, 80, 80);
    noStroke();
    
    let y = height - 200;
    for (let line of poemLines) {
        text(line, width/2, y);
        y += 25;
    }
    pop();
}

function drawFamilyConnections() {
    // Connect parents to sons
    for (let i = 1; i <= 4; i++) {
        stroke(45, 80, 80, 0.3);
        line(familyParticles[0].x, familyParticles[0].y, 
             familyParticles[i].x, familyParticles[i].y);
    }
    
    // Connect sons to grandchildren
    for (let i = 1; i <= 2; i++) {
        for (let j = 5; j <= 6; j++) {
            stroke(45, 80, 80, 0.2);
            line(familyParticles[i].x, familyParticles[i].y, 
                 familyParticles[j].x, familyParticles[j].y);
        }
    }
    for (let i = 3; i <= 4; i++) {
        for (let j = 7; j <= 8; j++) {
            stroke(45, 80, 80, 0.2);
            line(familyParticles[i].x, familyParticles[i].y, 
                 familyParticles[j].x, familyParticles[j].y);
        }
    }
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
        this.angle = noise(this.x * 0.01, this.y * 0.01, time) * TWO_PI;
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;
        
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.reset();
        }
    }
    
    display() {
        noStroke();
        fill(this.hue, 80, 80, this.alpha);
        ellipse(this.x, this.y, this.size);
    }
}

class FamilyParticle {
    constructor(x, y, size, hue, generation, label) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.hue = hue;
        this.generation = generation;
        this.label = label;
        this.angle = 0;
    }
    
    display() {
        // Draw particle
        noStroke();
        fill(this.hue, 80, 80, 0.8);
        ellipse(this.x, this.y, this.size);
        
        // Draw label
        push();
        textAlign(CENTER);
        textSize(12);
        fill(this.hue, 80, 80);
        text(this.label, this.x, this.y + this.size + 15);
        pop();
    }
} 