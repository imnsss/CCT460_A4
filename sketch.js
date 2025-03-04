
// A1
var sketch1 = function(p) {
  p.setup = function() {
    let canvas = p.createCanvas(600, 400);
    canvas.parent('sketch1');
    p.noStroke();
  }

  p.draw = function() {
    // Sky
    p.background(155, 206, 235);
    
    // Sunlight
    p.fill(255, 200, 100);
    p.ellipse(240, 150, 180, 60);
    
    // Sunset glow
    p.fill(250);
    p.ellipse(100, 70, 70, 50);
    p.ellipse(130, 70, 60, 40);
    p.ellipse(450, 100, 80, 50);
    p.ellipse(480, 100, 60, 40);
    p.ellipse(350, 50, 80, 50);
    p.ellipse(380, 50, 60, 40);
    
    // lake
    p.fill(70, 144, 205);
    p.rect(0, 250, p.width, 150);
    
    // City skyline
    p.fill(55);
    // CN Tower
    p.rect(370, 80, 20, 170);
    p.ellipse(380, 120, 50, 40);
    p.triangle(360, 90, 400, 90, 380, 45);
    
    // Rogers Centre
    p.rect(245, 205, 75, 45);

    p.fill(233);
    p.ellipse(282, 210, 90, 40);

    p.fill(220);
    p.ellipse(282, 210, 80, 30);

    p.fill(55);
    // rect / other buildings
    p.rect(100, 200, 22, 50);
    p.rect(40, 210, 22, 40);
    p.rect(135, 200, 22, 50);
    p.rect(160, 180, 42, 70);
    p.rect(205, 150, 31, 100);
    p.rect(330, 180, 12, 70);
    p.rect(345, 170, 22, 80);
    p.rect(400, 170, 21, 80);
    p.rect(425, 160, 41, 90);
    p.rect(470, 150, 24, 100);
    p.rect(500, 140, 45, 110);
    p.rect(550, 170, 17, 80);
    p.rect(570, 150, 20, 100);
    p.rect(520, 120, 5, 30);
    
    // water wave
    p.fill(255, 255, 255, 30);
    for(let i = 0; i < 5; i++) {
      p.rect(0, 280 + i*25, p.width, 10);
    }
    
    // Yizhi Zhou, its me ovo
    p.fill(255,230,205);
    // head
    p.circle(80, 200, 100);
    p.rect(70, 240, 25, 30);

    // coat & body
    p.fill(20);
    p.ellipse(80, 175, 100, 50);
    p.rect(30, 260, 105, 140);

    // coat hat
    p.ellipse(72, 280, 100, 50);
    p.ellipse(135, 320, 50, 120);
    p.ellipse(30, 320, 50, 120);

    // brand logo pixel version
    p.fill(170);
    p.rect(102, 295, 10, 10);
  }
}

// A2
var sketch2 = function(p) {
  var shootingStars = [];

  p.setup = function() {
    let canvas = p.createCanvas(800, 800);
    canvas.parent('sketch2');
  }

  p.draw = function() {
    p.background(150);
    p.stroke(255);

    // revised/improved code of week 3 in class prac
    for (var j = 0; j < p.height; j = j + 25) {
      for (var i = 0; i < p.width; i = i + 25) {
        p.fill(100, 100, j * 0.5);

        var angle = (i + j + p.frameCount * 0.1) * 0.2;
        var size = p.map(p.sin(angle), 1, -1, 15, 40);

        p.rectMode(p.CENTER);

        p.push();

        p.translate(i, j);
        p.rotate(angle * 0.3); // rotate each rectangle

        var r = p.dist(p.mouseX, p.mouseY, i, j); // distance between mouse and the center of the shape

        if (p.mouseIsPressed) {
           p.fill(120, 130, r);
        }

        p.rect(0, 0, size, size);
        p.pop();
      }
    }

    if (p.random(1) < 0.02) {
      // 2% possibility create object for the new star
      var newStar = {
        // define the initial location of the star
        x: p.random(-20, p.width/2),
        y: 0, 

        // define the speed of the star
        speedX: p.random(4, 8),
        speedY: p.random(4, 8)
      };

      // push newStar to shootingStars array
      shootingStars.push(newStar);
    }

    // Draw the Shooting Stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      // define the current star
      let star = shootingStars[i];

      // draw the shooting star
      p.line(star.x, star.y, star.x - 10, star.y - 10);
      
      // update the position
      star.x += star.speedX;
      star.y += star.speedY;

      // remove the star if its height > height
      if (star.y > p.height) {
        shootingStars.splice(i, 1);
      }
    }
  }
}

// A3
var sketch3 = function(p) {
  let pet;
  let foodItems = [];
  let bones = [];
  let petImage;
  let petImage2;
  let petImage3;
  let petImageHungry;
  let boneImage;
  let foodImage;
  let bgImage;
  let hunger = 100;
  let happiness = 100;

  p.preload = function() {
    petImage = p.loadImage('images/1.png');
    petImage2 = p.loadImage('images/7.png');
    petImage3 = p.loadImage('images/5.png');
    petImageHungry = p.loadImage('images/3.png');
    boneImage = p.loadImage('images/bone.png');
    foodImage = p.loadImage('images/food.png');
    bgImage = p.loadImage('images/bg.jpg');
  }

  p.setup = function() {
    let canvas = p.createCanvas(800, 600);
    canvas.parent('sketch3');
    pet = new VirtualPet(p.width/2, p.height/2);
    document.addEventListener('contextmenu', event => event.preventDefault());
  }

  // Draw
  p.draw = function() {
    p.image(bgImage, 0, 0, p.width, p.height);
    
    if (p.frameCount % 60 == 0) {
      hunger -= 1;
      happiness -= 0.3;
    }
    
    displayStats();
    pet.update();
    pet.display();
    updateItems();
  }

  // Mouse and keyboard interaction
  p.mousePressed = function() {
    if (p.mouseButton === p.LEFT) {
      foodItems.push(new FoodItem(p.mouseX, p.mouseY));
      hunger = p.min(hunger + 20, 100);
      pet.isEating = true;
      pet.eatingTimer = 0;
    }
    else if (p.mouseButton === p.RIGHT) {
      bones.push(new BoneItem(p.mouseX, p.mouseY));
      happiness = p.min(happiness + 15, 100);
      pet.isPlaying = true;
      pet.playingTimer = 0;
    }
  }

  p.keyPressed = function() {
    if (p.key === ' ') {
      pet.isFollowing = true;
    }
  }

  p.keyReleased = function() {
    if (p.key === ' ') {
      pet.isFollowing = false;
    }
  }

  // Create the Doge!
  class VirtualPet {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.size = 100;
      this.mood = "normal";
      this.isFollowing = false;
      this.isEating = false;
      this.isPlaying = false;
      this.eatingTimer = 0;
      this.playingTimer = 0;
    }
    
    // Create CLass
    
    // update the mood
    update() {
      if (hunger < 30 || happiness < 30) {
        this.mood = "sad";
      } else if (hunger > 80 && happiness > 80) {
        this.mood = "happy";
      } else {
        this.mood = "normal";
      }
      
      if (this.isEating) {
        this.eatingTimer++;
        if (this.eatingTimer > 30) {
          this.isEating = false;
          this.eatingTimer = 0;
        }
      }

      if (this.isPlaying) {
        this.playingTimer++;
        if (this.playingTimer > 30) {
          this.isPlaying = false;
          this.playingTimer = 0;
        }
      }

      // make the doge to follow the mouse
      if (this.isFollowing) {
        let targetX = p.mouseX;
        let targetY = p.mouseY;
        
        let dx = targetX - this.pos.x;
        let dy = targetY - this.pos.y;
        
        this.pos.x += dx * 0.05;
        this.pos.y += dy * 0.05;
      }
      
      this.pos.x = p.constrain(this.pos.x, this.size/2, p.width-this.size/2);
      this.pos.y = p.constrain(this.pos.y, this.size/2, p.height-this.size/2);
    }
    
    display() {
      p.push();
      p.imageMode(p.CENTER);
      if (this.isEating) {
        p.image(petImage2, this.pos.x, this.pos.y, this.size, this.size);
      } else if (this.isPlaying) {
        p.image(petImage3, this.pos.x, this.pos.y, this.size, this.size);
      } else if (hunger < 90) {
        p.image(petImageHungry, this.pos.x, this.pos.y, this.size, this.size);
      } else {
        p.image(petImage, this.pos.x, this.pos.y, this.size, this.size);
      }
      p.pop();
    }
  }

  // Food
  class FoodItem {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.life = 300;
      this.size = 40;
    }
    
    display() {
      p.push();
      p.imageMode(p.CENTER);
      p.tint(255, this.life);
      p.image(foodImage, this.pos.x, this.pos.y, this.size, this.size);
      this.life -= 5;
      p.pop();
    }
  }

  // Bone
  class BoneItem {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.life = 255;
      this.size = 40;
    }
    
    display() {
      p.push();
      p.imageMode(p.CENTER);
      p.image(boneImage, this.pos.x, this.pos.y, this.size, this.size);
      this.life -= 5;
      p.pop();
    }
  }

  function updateItems() {
    for (let i = foodItems.length - 1; i >= 0; i--) {
      foodItems[i].display();
      if (foodItems[i].life <= 0) {
        foodItems.splice(i, 1);
      }
    }
    
    for (let i = bones.length - 1; i >= 0; i--) {
      bones[i].display();
      if (bones[i].life <= 0) {
        bones.splice(i, 1);
      }
    }
  }

  // Show Stats and tutorial
  function displayStats() {
    p.fill(0);
    p.noStroke();
    p.textSize(20);
    p.text(`Hunger: ${p.floor(hunger)}%`, 50, 30);
    p.text(`Happiness: ${p.floor(happiness)}%`, 50, 60);
    p.text(`Left click to feed`, p.width-200, 30);
    p.text(`Right click to play`, p.width-200, 60);
    p.text(`Hold Space to follow`, p.width-200, 90);
  }
}

var myP5 = new p5(sketch1);
var myP5 = new p5(sketch2);
var myP5 = new p5(sketch3);