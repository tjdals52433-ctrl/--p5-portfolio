 function setup(){
  createCanvas(720, 540);
  noLoop();
}

function draw(){
  background(255);

  const cx = width*0.5;
  const cy = height*0.48;

  const SKIN = color(238, 210, 186);
  const HAIR = color(20, 22, 28);
  const BROW = color(32, 34, 42);
  const IRIS = color(85, 115, 165);
  const LIP  = color(168, 92, 98);
  const SHIRT= color(220);
  const FRAME= color(24, 24, 24);
  const LENS = color(0, 0, 0, 60);
  const CAP1 = color(233, 70, 110);
  const CAP2 = color(255, 120, 150);

  noStroke(); 
  fill(SHIRT);
  rectMode(CENTER);
  rect(cx, cy+150, 220, 110, 18);
  fill(60); 
  ellipse(cx, cy+140, 14, 14);

  drawLongHair(cx, cy, HAIR);

  fill(SKIN);
  ellipse(cx, cy-4, 180, 210);
  rect(cx, cy+84, 64, 40, 10);

  fill(SKIN);
  ellipse(cx-96, cy+8, 26, 34);
  ellipse(cx+96, cy+8, 26, 34);

  fill(BROW);
  rect(cx-58, cy-56, 84, 14, 7);
  rect(cx+58, cy-56, 84, 14, 7);

  drawBigEyes(cx, cy, IRIS);

  stroke(120,95,80,170); 
  strokeWeight(3);
  line(cx, cy-20, cx, cy+18);
  noStroke(); 
  fill(210,175,145,150);
  ellipse(cx, cy+20, 30, 12);

  fill(40,35,40,220);
  rect(cx, cy+54, 50, 6, 3);
  fill(LIP);
  rect(cx, cy+59, 44, 12, 5);

  drawGlasses(cx, cy, FRAME, LENS);
  drawCap(cx, cy-126, CAP1, CAP2);
}

function drawLongHair(cx, cy, HAIR){
  noStroke(); 
  fill(HAIR);
  ellipse(cx, cy-22, 300, 240);
  ellipse(cx-160, cy+20, 140, 160);
  ellipse(cx+160, cy+20, 140, 160);
  ellipse(cx-90, cy+110, 90, 110);
  ellipse(cx+90, cy+110, 90, 110);
}

function drawBigEyes(cx, cy, IRIS){
  noStroke(); 
  fill(255);
  ellipse(cx-58, cy-36, 86, 46);
  ellipse(cx+58, cy-36, 86, 46);
  fill(IRIS);
  ellipse(cx-58, cy-36, 34, 34);
  ellipse(cx+58, cy-36, 34, 34);
  fill(20);
  ellipse(cx-58, cy-36, 14, 14);
  ellipse(cx+58, cy-36, 14, 14);
  fill(255, 230);
  ellipse(cx-66, cy-44, 8, 8);
  ellipse(cx+50, cy-44, 8, 8);
  noFill(); 
  stroke(125,100,88,160); 
  strokeWeight(2);
  arc(cx-58, cy-42, 88, 26, PI+0.2, TWO_PI-0.2);
  arc(cx+58, cy-42, 88, 26, PI+0.2, TWO_PI-0.2);
  noStroke();
}

function drawGlasses(cx, cy, FRAME, LENS){
  noStroke(); 
  fill(FRAME); 
  rectMode(CENTER);
  rect(cx-58, cy-36, 112, 56, 8);
  rect(cx+58, cy-36, 112, 56, 8);
  fill(LENS);
  rect(cx-58, cy-36, 100, 44, 7);
  rect(cx+58, cy-36, 100, 44, 7);
  stroke(FRAME); 
  strokeWeight(7);
  line(cx-14, cy-36, cx+14, cy-36);
  noStroke();
}

function drawCap(x, y, pinkDark, pinkLite){
  noStroke(); 
  fill(pinkDark);
  arc(x, y+30, 300, 70, PI, TWO_PI);
  fill(pinkLite);
  arc(x, y+20, 260, 46, PI, TWO_PI);
  fill(252);
  arc(x, y, 260, 150, PI, TWO_PI);
  fill(pinkDark);
  drawStar(x-48, y+12, 9);
  drawStar(x,     y+10, 9);
  drawStar(x+48,  y+12, 9);
  fill(pinkDark);
  ellipse(x, y-50, 18, 18);
  rectMode(CENTER);
  rect(x, y-28, 6, 32, 3);
}

function drawStar(x, y, r){
  push(); 
  translate(x, y); 
  noStroke();
  triangle(0,-r, -0.85*r, 0.65*r, 0.85*r, 0.65*r);
  triangle(0, r, -0.85*r,-0.65*r, 0.85*r,-0.65*r);
  pop();
}

function keyPressed(){
  if(key === 'S' || key === 's') saveCanvas('caricature_longhair_glasses_cap','png');
}
