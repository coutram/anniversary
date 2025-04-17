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
    "Four grandchildren, blessings combined.",
    "Mason, Owen, Shriya, Vishal,",
    "A family tree that stands so tall."
];

// Color palette
const colors = {
    background: [30, 10, 98],  // Very light neutral
    parents: [0, 0, 0],        // Black
    sons: [0, 0, 0],           // Black
    daughters: [0, 0, 0],      // Black
    grandchildren: [0, 0, 0],  // Black
    text: [30, 30, 50],        // Muted brown
    particle1: [340, 30, 90],  // Soft pink
    particle2: [60, 30, 90],   // Soft yellow
    particle3: [180, 30, 90]   // Soft blue
};

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100, 1);
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Create family particles with smaller sizes
    // Parents (2)
    familyParticles.push(new FamilyParticle(width/2, height/2, 20, colors.parents, 1, "Cecil & Indranie", "couple"));
    // Sons and wives (4)
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 100, 15, colors.sons, 2, "Nick", "man"));
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 150, 15, colors.daughters, 2, "Krupa", "woman"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 100, 15, colors.sons, 2, "Chris", "man"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 150, 15, colors.daughters, 2, "Shalini", "woman"));
    // Grandchildren (4)
    familyParticles.push(new FamilyParticle(width/2 - 150, height/2 - 200, 12, colors.grandchildren, 3, "Mason", "man"));
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 200, 12, colors.grandchildren, 3, "Owen", "man"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 200, 12, colors.grandchildren, 3, "Shriya", "woman"));
    familyParticles.push(new FamilyParticle(width/2 + 150, height/2 - 200, 12, colors.grandchildren, 3, "Vishal", "man"));
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
        stroke(0, 0, 0, 0.3);
        line(familyParticles[0].x, familyParticles[0].y, 
             familyParticles[i].x, familyParticles[i].y);
    }
    
    // Connect sons to grandchildren
    for (let i = 1; i <= 2; i++) {
        for (let j = 5; j <= 6; j++) {
            stroke(0, 0, 0, 0.2);
            line(familyParticles[i].x, familyParticles[i].y, 
                 familyParticles[j].x, familyParticles[j].y);
        }
    }
    for (let i = 3; i <= 4; i++) {
        for (let j = 7; j <= 8; j++) {
            stroke(0, 0, 0, 0.2);
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
        this.hue = random([colors.particle1[0], colors.particle2[0], colors.particle3[0]]);
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
        fill(this.hue, 30, 90, this.alpha);
        ellipse(this.x, this.y, this.size);
    }
}

function drawMan(x, y, size) {
    push();
    translate(x, y);
    stroke(0);
    strokeWeight(2);
    noFill();
    
    // Head
    ellipse(0, -size/2, size/2, size/2);
    
    // Body
    line(0, -size/4, 0, size/4);
    
    // Arms
    line(-size/3, 0, size/3, 0);
    
    // Legs
    line(0, size/4, -size/3, size/2);
    line(0, size/4, size/3, size/2);
    pop();
}

function drawWoman(x, y, size) {
    push();
    translate(x, y);
    stroke(0);
    strokeWeight(2);
    noFill();
    
    // Head
    ellipse(0, -size/2, size/2, size/2);
    
    // Body
    line(0, -size/4, 0, size/4);
    
    // Arms
    line(-size/3, 0, size/3, 0);
    
    // Legs
    line(0, size/4, -size/3, size/2);
    line(0, size/4, size/3, size/2);
    
    // Dress
    noStroke();
    fill(0);
    triangle(-size/3, size/4, size/3, size/4, 0, size/2);
    pop();
}

function drawCouple(x, y, size) {
    push();
    translate(x, y);
    
    // Draw man
    drawMan(-size/4, 0, size);
    
    // Draw woman
    drawWoman(size/4, 0, size);
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
        // Add padding around the icon
        this.backgroundSize = this.size * 1.8;
    }
    
    display() {
        // Draw white background circle
        push();
        noStroke();
        fill(255, 255, 255, 1); // Fully opaque white
        ellipse(this.x, this.y, this.backgroundSize, this.backgroundSize);
        pop();
        
        // Draw the icon
        if (this.type === 'couple') {
            drawCouple(this.x, this.y, this.size);
        } else if (this.type === 'man') {
            drawMan(this.x, this.y, this.size);
        } else if (this.type === 'woman') {
            drawWoman(this.x, this.y, this.size);
        }
        
        // Draw label
        push();
        textAlign(CENTER);
        textSize(12);
        fill(colors.text[0], colors.text[1], colors.text[2]);
        text(this.label, this.x, this.y + this.backgroundSize/2 + 15);
        pop();
    }
} 