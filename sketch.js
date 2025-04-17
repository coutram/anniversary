let particles = [];
let familyParticles = [];
let goldenRatio = (1 + Math.sqrt(5)) / 2;
let time = 0;
let poemLines = [
    "Fifty years of love and grace,",
    "Cecil and Indranie's embrace.",
    "Two sons raised with love so true,",
    "Nick and Chris, strong and new.",
    "Krupa and Shalini, hearts aligned,",
    "Five grandchildren, blessings combined.",
    "Mason, Owen, Shriya, Vishal,",
    "A family tree that stands so tall."
];

// Pastel color palette
const colors = {
    background: [30, 10, 98],  // Very light neutral
    parents: [30, 20, 90],     // Soft beige
    sons: [30, 15, 85],        // Light taupe
    daughters: [30, 10, 80],   // Warm gray
    grandchildren: [30, 5, 75], // Soft gray
    text: [30, 30, 50]         // Muted brown
};

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100, 1);
    
    // Create initial particles with pastel colors
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Create family particles
    // Parents (2)
    familyParticles.push(new FamilyParticle(width/2, height/2, 20, colors.parents, 1, "Cecil & Indranie"));
    // Sons and wives (4)
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 100, 15, colors.sons, 2, "Nick"));
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 150, 15, colors.daughters, 2, "Krupa"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 100, 15, colors.sons, 2, "Chris"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 150, 15, colors.daughters, 2, "Shalini"));
    // Grandchildren (4)
    familyParticles.push(new FamilyParticle(width/2 - 150, height/2 - 200, 10, colors.grandchildren, 3, "Mason"));
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 200, 10, colors.grandchildren, 3, "Owen"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 200, 10, colors.grandchildren, 3, "Shriya"));
    familyParticles.push(new FamilyParticle(width/2 + 150, height/2 - 200, 10, colors.grandchildren, 3, "Vishal"));
}

function draw() {
    background(colors.background[0], colors.background[1], colors.background[2]);
    
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
    fill(colors.text[0], colors.text[1], colors.text[2]);
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
        stroke(colors.parents[0], colors.parents[1], colors.parents[2], 0.3);
        line(familyParticles[0].x, familyParticles[0].y, 
             familyParticles[i].x, familyParticles[i].y);
    }
    
    // Connect sons to grandchildren
    for (let i = 1; i <= 2; i++) {
        for (let j = 5; j <= 6; j++) {
            stroke(colors.sons[0], colors.sons[1], colors.sons[2], 0.2);
            line(familyParticles[i].x, familyParticles[i].y, 
                 familyParticles[j].x, familyParticles[j].y);
        }
    }
    for (let i = 3; i <= 4; i++) {
        for (let j = 7; j <= 8; j++) {
            stroke(colors.sons[0], colors.sons[1], colors.sons[2], 0.2);
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
        this.hue = random(20, 40); // Neutral pastel range
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
        fill(this.hue, 20, 90, this.alpha); // Pastel version
        ellipse(this.x, this.y, this.size);
    }
}

class FamilyParticle {
    constructor(x, y, size, color, generation, label) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.generation = generation;
        this.label = label;
        this.angle = 0;
    }
    
    display() {
        // Draw particle
        noStroke();
        fill(this.color[0], this.color[1], this.color[2], 0.8);
        ellipse(this.x, this.y, this.size);
        
        // Draw label
        push();
        textAlign(CENTER);
        textSize(12);
        fill(colors.text[0], colors.text[1], colors.text[2]);
        text(this.label, this.x, this.y + this.size + 15);
        pop();
    }
} 