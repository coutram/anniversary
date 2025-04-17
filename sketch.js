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

// Add these variables at the top of the file
let selectedParticle = null;
let offsetX = 0;
let offsetY = 0;

// Color palette
const colors = {
    background: [30, 10, 98],    // Very light neutral
    man: [210, 70, 90],         // Blue
    woman: [330, 70, 90],       // Pink
    text: [30, 30, 50],         // Muted brown
    gold: [45, 70, 90],         // Golden color
    // Flower colors in HSB
    flower1: [330, 60, 95],     // Pink
    flower2: [280, 50, 95],     // Purple
    flower3: [180, 50, 95],     // Turquoise
    flower4: [50, 60, 95],      // Yellow
    // Bird colors in HSB
    bird1: [30, 50, 90],        // Warm brown
    bird2: [200, 50, 95],       // Sky blue
    bird3: [150, 50, 90]        // Sage green
};

let heartParticles = [];

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100, 1);
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Create heart particles
    for (let i = 0; i < 15; i++) {
        heartParticles.push(new HeartParticle());
    }
    
    // Create family particles with smaller sizes
    // Parents (2)
    familyParticles.push(new FamilyParticle(width/2, height/2, 20, colors.man, 1, "Cecil & Indranie", "couple"));
    // Sons and wives (4)
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 100, 15, colors.man, 2, "Nick", "man"));
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 150, 15, colors.woman, 2, "Krupa", "woman"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 100, 15, colors.man, 2, "Chris", "man"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 150, 15, colors.woman, 2, "Shalini", "woman"));
    // Grandchildren (4)
    familyParticles.push(new FamilyParticle(width/2 - 150, height/2 - 200, 12, colors.man, 3, "Mason", "man"));
    familyParticles.push(new FamilyParticle(width/2 - 100, height/2 - 200, 12, colors.man, 3, "Owen", "man"));
    familyParticles.push(new FamilyParticle(width/2 + 100, height/2 - 200, 12, colors.woman, 3, "Shriya", "woman"));
    familyParticles.push(new FamilyParticle(width/2 + 150, height/2 - 200, 12, colors.man, 3, "Vishal", "man"));
}

function draw() {
    background(colors.background[0], colors.background[1], colors.background[2]);
    
    // Draw golden frame
    drawFrame();
    
    // Update and display background particles
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
    
    // Update and display heart particles
    for (let heart of heartParticles) {
        heart.update();
        heart.display();
    }
    
    // Draw connecting lines between family members
    drawFamilyConnections();
    
    // Display family particles with breathing animation
    let breathingScale = 1 + sin(frameCount * 0.02) * 0.03;
    for (let particle of familyParticles) {
        particle.display(breathingScale);
    }
    
    // Draw anniversary text
    drawAnniversaryText();
    
    // Draw poem
    drawPoem();
    
    time += 0.01;
    
    // Add cursor styling
    if (selectedParticle) {
        cursor('grabbing');
    } else {
        let overParticle = false;
        for (let particle of familyParticles) {
            let d = dist(mouseX, mouseY, particle.x, particle.y);
            if (d < particle.backgroundSize / 2) {
                overParticle = true;
                break;
            }
        }
        cursor(overParticle ? 'grab' : 'default');
    }
}

function drawFrame() {
    push();
    noFill();
    strokeWeight(15);
    let frameGlow = 0.6 + sin(frameCount * 0.02) * 0.2;
    stroke(colors.gold[0], colors.gold[1], colors.gold[2], frameGlow);
    rect(20, 20, width - 40, height - 40, 20);
    
    // Inner frame
    strokeWeight(2);
    stroke(colors.gold[0], colors.gold[1], colors.gold[2], frameGlow * 0.8);
    rect(35, 35, width - 70, height - 70, 15);
    pop();
}

function drawAnniversaryText() {
    push();
    textAlign(CENTER, CENTER);
    textSize(32);
    let textGlow = 0.7 + sin(frameCount * 0.03) * 0.3;
    fill(colors.gold[0], colors.gold[1], colors.gold[2], textGlow);
    text("50 Years of Love", width/2, 80);
    
    textSize(20);
    fill(colors.gold[0], colors.gold[1], colors.gold[2], textGlow * 0.8);
    text("Cecil & Indranie", width/2, 120);
    pop();
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

function drawFlower(x, y, size, hue, sat, bright, alpha) {
    push();
    translate(x, y);
    noStroke();
    
    // Petals
    for (let i = 0; i < 5; i++) {
        fill(hue, sat, bright, alpha);
        rotate(TWO_PI / 5);
        ellipse(0, -size/2, size/1.5, size/3);
    }
    
    // Center
    fill(hue, sat * 1.2, bright * 0.9, alpha);
    ellipse(0, 0, size/2, size/2);
    pop();
}

function drawBird(x, y, size, hue, sat, bright, alpha) {
    push();
    translate(x, y);
    
    // Body
    fill(hue, sat, bright, alpha);
    noStroke();
    ellipse(0, 0, size, size/1.5);
    
    // Wing
    fill(hue, sat * 1.2, bright * 0.9, alpha);
    ellipse(size/4, -size/8, size/2, size/3);
    
    // Head
    fill(hue, sat, bright, alpha);
    ellipse(-size/3, -size/4, size/2, size/2);
    
    // Beak
    fill(hue, sat * 0.8, bright * 0.7, alpha);
    triangle(-size/2, -size/4, -size/2 - size/4, -size/4, -size/2, -size/8);
    
    pop();
}

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(8, 20);
        this.speed = random(0.5, 2);
        this.angle = random(TWO_PI);
        this.type = random() < 0.5 ? 'flower' : 'bird';
        
        // Randomly select color based on type
        if (this.type === 'flower') {
            let flowerColor = random([colors.flower1, colors.flower2, colors.flower3, colors.flower4]);
            this.hue = flowerColor[0];
            this.sat = flowerColor[1];
            this.bright = flowerColor[2];
        } else {
            let birdColor = random([colors.bird1, colors.bird2, colors.bird3]);
            this.hue = birdColor[0];
            this.sat = birdColor[1];
            this.bright = birdColor[2];
        }
        this.alpha = random(0.4, 0.8);
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
            drawFlower(this.x, this.y, this.size, this.hue, this.sat, this.bright, this.alpha);
        } else {
            drawBird(this.x, this.y, this.size, this.hue, this.sat, this.bright, this.alpha);
        }
    }
}

function drawMan(x, y, size) {
    push();
    translate(x, y);
    stroke(colors.man[0], colors.man[1], colors.man[2]);
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
    stroke(colors.woman[0], colors.woman[1], colors.woman[2]);
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
    fill(colors.woman[0], colors.woman[1], colors.woman[2]);
    triangle(-size/3, size/4, size/3, size/4, 0, size/2);
    pop();
}

function drawCouple(x, y, size) {
    push();
    translate(x, y);
    
    // Draw man (slightly to the left)
    drawMan(-size/4, 0, size);
    
    // Draw woman (slightly to the right)
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
    
    display(breathingScale = 1) {
        // Draw white background circle with subtle glow
        push();
        noStroke();
        fill(0, 0, 100, 1);
        ellipse(this.x, this.y, this.backgroundSize * breathingScale, this.backgroundSize * breathingScale);
        
        // Add subtle glow
        for(let i = 3; i > 0; i--) {
            fill(0, 0, 100, 0.1);
            ellipse(this.x, this.y, (this.backgroundSize + i*5) * breathingScale, (this.backgroundSize + i*5) * breathingScale);
        }
        pop();
        
        // Draw the icon
        push();
        translate(this.x, this.y);
        if (this.type === 'couple') {
            drawCouple(0, 0, this.size * breathingScale);
        } else if (this.type === 'man') {
            drawMan(0, 0, this.size * breathingScale);
        } else if (this.type === 'woman') {
            drawWoman(0, 0, this.size * breathingScale);
        }
        pop();
        
        // Draw label
        push();
        textAlign(CENTER);
        textSize(12 * breathingScale);
        fill(colors.text[0], colors.text[1], colors.text[2]);
        text(this.label, this.x, this.y + (this.backgroundSize/2 + 15) * breathingScale);
        pop();
    }
}

function mousePressed() {
    // Check if we clicked on any family particle
    for (let particle of familyParticles) {
        let d = dist(mouseX, mouseY, particle.x, particle.y);
        if (d < particle.backgroundSize / 2) {
            selectedParticle = particle;
            offsetX = particle.x - mouseX;
            offsetY = particle.y - mouseY;
            break;
        }
    }
}

function mouseReleased() {
    selectedParticle = null;
}

function mouseDragged() {
    if (selectedParticle) {
        // Calculate new position
        let newX = mouseX + offsetX;
        let newY = mouseY + offsetY;
        
        // Get the movement delta
        let dx = newX - selectedParticle.x;
        let dy = newY - selectedParticle.y;
        
        // Move the selected particle
        selectedParticle.x = newX;
        selectedParticle.y = newY;
        
        // Move connected family members to maintain structure
        if (selectedParticle.generation === 1) {
            // If parents are moved, move everyone
            for (let particle of familyParticles) {
                if (particle !== selectedParticle) {
                    particle.x += dx;
                    particle.y += dy;
                }
            }
        } else if (selectedParticle.generation === 2) {
            // If a son or wife is moved, move their children
            let startIndex = (selectedParticle === familyParticles[1] || selectedParticle === familyParticles[2]) ? 5 : 7;
            let endIndex = startIndex + 2;
            
            for (let i = startIndex; i < endIndex; i++) {
                familyParticles[i].x += dx;
                familyParticles[i].y += dy;
            }
            
            // Move spouse together
            let spouseIndex = -1;
            if (selectedParticle === familyParticles[1]) spouseIndex = 2;
            if (selectedParticle === familyParticles[2]) spouseIndex = 1;
            if (selectedParticle === familyParticles[3]) spouseIndex = 4;
            if (selectedParticle === familyParticles[4]) spouseIndex = 3;
            
            if (spouseIndex !== -1) {
                familyParticles[spouseIndex].x += dx;
                familyParticles[spouseIndex].y += dy;
            }
        }
    }
}

class HeartParticle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(5, 15);
        this.speed = random(0.2, 0.8);
        this.angle = random(TWO_PI);
        this.alpha = random(0.1, 0.3);
    }
    
    update() {
        this.y -= this.speed;
        this.x += sin(frameCount * 0.05 + this.angle) * 0.5;
        
        if (this.y < -20) {
            this.y = height + 20;
            this.x = random(width);
        }
    }
    
    display() {
        push();
        translate(this.x, this.y);
        noStroke();
        fill(colors.gold[0], colors.gold[1], colors.gold[2], this.alpha);
        
        beginShape();
        vertex(0, -this.size/2);
        bezierVertex(this.size/2, -this.size, 
                    this.size/2, 0, 
                    0, this.size/2);
        bezierVertex(-this.size/2, 0, 
                    -this.size/2, -this.size, 
                    0, -this.size/2);
        endShape(CLOSE);
        pop();
    }
} 