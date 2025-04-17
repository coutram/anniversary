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
    text: [30, 30, 50],        // Muted brown
    flower1: [340, 30, 90],    // Soft pink
    flower2: [60, 30, 90],     // Soft yellow
    flower3: [180, 30, 90],    // Soft blue
    bird: [20, 30, 80]         // Soft brown
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
    familyParticles.push(new FamilyParticle(width/2, height/2, 30, colors.parents, 1, "Cecil & Indranie", "flower"));
    // Sons and wives (4)
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 100, 25, colors.sons, 2, "Nick", "bird"));
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 150, 25, colors.daughters, 2, "Krupa", "flower"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 100, 25, colors.sons, 2, "Chris", "bird"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 150, 25, colors.daughters, 2, "Shalini", "flower"));
    // Grandchildren (4)
    familyParticles.push(new FamilyParticle(width/2 - 150, height/2 - 200, 20, colors.grandchildren, 3, "Mason", "bird"));
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 200, 20, colors.grandchildren, 3, "Owen", "bird"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 200, 20, colors.grandchildren, 3, "Shriya", "flower"));
    familyParticles.push(new FamilyParticle(width/2 + 150, height/2 - 200, 20, colors.grandchildren, 3, "Vishal", "bird"));
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
        this.type = random() < 0.5 ? 'flower' : 'bird';
        this.hue = this.type === 'flower' ? 
            random([colors.flower1[0], colors.flower2[0], colors.flower3[0]]) : 
            colors.bird[0];
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
        if (this.type === 'flower') {
            drawFlower(this.x, this.y, this.size, this.hue, this.alpha);
        } else {
            drawBird(this.x, this.y, this.size, this.hue, this.alpha);
        }
    }
}

function drawFlower(x, y, size, hue, alpha) {
    push();
    translate(x, y);
    noStroke();
    
    // Petals
    for (let i = 0; i < 5; i++) {
        fill(hue, 30, 90, alpha);
        rotate(TWO_PI / 5);
        ellipse(0, -size/2, size, size/2);
    }
    
    // Center
    fill(hue, 50, 80, alpha);
    ellipse(0, 0, size/2, size/2);
    pop();
}

function drawBird(x, y, size, hue, alpha) {
    push();
    translate(x, y);
    noStroke();
    
    // Body
    fill(hue, 30, 80, alpha);
    ellipse(0, 0, size, size/1.5);
    
    // Head
    ellipse(-size/2, -size/4, size/2, size/2);
    
    // Beak
    fill(hue, 50, 60, alpha);
    triangle(-size/2 - size/4, -size/4, -size/2 - size/2, -size/4, -size/2 - size/4, 0);
    
    // Wing
    fill(hue, 20, 70, alpha);
    ellipse(size/4, 0, size/2, size/3);
    pop();
}

class FamilyParticle {
    constructor(x, y, size, color, generation, label, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.generation = generation;
        this.label = label;
        this.type = type;
        this.angle = 0;
    }
    
    display() {
        if (this.type === 'flower') {
            drawFlower(this.x, this.y, this.size, this.color[0], 0.8);
        } else {
            drawBird(this.x, this.y, this.size, this.color[0], 0.8);
        }
        
        // Draw label
        push();
        textAlign(CENTER);
        textSize(12);
        fill(colors.text[0], colors.text[1], colors.text[2]);
        text(this.label, this.x, this.y + this.size + 15);
        pop();
    }
} 