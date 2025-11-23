
let cx, cy;
let faceW=180, faceH=210;
let mouthCurve=6;
let browTilt=-6;
let hairLen=110;
let lensAlpha=60;
let autoBlink=true;
let blinkPhase=0;
let gazeX=0, gazeY=0;

let baseHue = 0;
const FPS = 60;
const DURATION_FRAMES = 10*FPS;
const HUE_SPEED = (360*4)/DURATION_FRAMES;

let COL_SKIN, COL_SHADE, COL_HAIR, COL_BROW, COL_IRIS, COL_LID, COL_NOSE, COL_NOSE_HL, COL_LIP, COL_FRAME, COL_INNER;

function setup(){
  createCanvas(480, 480);
  frameRate(FPS);
  cx = width*0.5;
  cy = height*0.54;
  noCursor();

  COL_SKIN    = color(242,210,176);
  COL_SHADE   = color(225,191,155,70);
  COL_HAIR    = color(24,26,32);
  COL_BROW    = color(36,39,50);
  COL_IRIS    = color(80,110,140);
  COL_LID     = color(120,95,80,170);
  COL_NOSE    = color(120,95,75,170);
  COL_NOSE_HL = color(215,185,150,140);
  COL_LIP     = color(168,92,98);
  COL_FRAME   = color(24,24,24);
  COL_INNER   = color(250);
}

function draw(){
  baseHue = (baseHue + HUE_SPEED) % 360;
  background(252);

  colorMode(HSB, 360,100,100,255);
  const CAP1 = color(baseHue,80,90);
  const CAP2 = color((baseHue+20)%360,65,100);
  const DOME = color(0,0,98);
  const JACKET = color((baseHue+180)%360,70,85);
  const FRAME_TINT = color((baseHue+300)%360,40,30);
  const LENS_TINT  = color((baseHue+300)%360,40,60,lensAlpha);
  colorMode(RGB,255,255,255,255);

  drawTorsoHSB(cx+18, cy+140, JACKET, COL_INNER);
  drawHairBack(cx, cy, COL_HAIR);

  noStroke(); fill(COL_SKIN);
  ellipse(cx, cy-6, faceW, faceH);
  rectMode(CENTER);
  rect(cx, cy+84, 64, 38, 10);

  fill(COL_SHADE);
  ellipse(cx-0.22*faceW, cy+4, 0.35*faceW, 0.2*faceH);
  ellipse(cx+0.22*faceW, cy+4, 0.35*faceW, 0.2*faceH);
  ellipse(cx, cy+0.26*faceH, 0.34*faceW, 0.24*faceH);

  fill(COL_SKIN);
  ellipse(cx-0.53*faceW, cy+6, 22, 30);
  ellipse(cx+0.53*faceW, cy+6, 22, 30);

  drawFrontHair(cx, cy, hairLen, COL_HAIR);
  drawBrows(cx, cy, browTilt, COL_BROW);
  drawEyes(cx, cy, gazeX, gazeY, COL_IRIS, COL_LID);

  stroke(COL_NOSE); strokeWeight(3);
  line(cx, cy-20, cx, cy+16);
  noStroke(); fill(COL_NOSE_HL);
  ellipse(cx, cy+20, 28, 12);

  drawMouth(cx, cy, mouthCurve, COL_LIP);
  drawGlassesTint(cx, cy, COL_FRAME, FRAME_TINT, LENS_TINT);
  drawCapHSB(cx, cy-126, 0, CAP1, CAP2, DOME);

  if (autoBlink) blinkPhase = (sin(frameCount*0.12)+1)*0.5;
  else blinkPhase = 0;

  noStroke(); fill(10,120);
  ellipse(mouseX, mouseY, 6, 6);
}

function drawTorsoHSB(x, y, jacketHSB, innerRGB){
  colorMode(HSB,360,100,100,255);
  noStroke(); fill(jacketHSB);
  colorMode(RGB,255,255,255,255);
  rectMode(CENTER);
  rect(x, y, 240, 200, 36);
  fill(230,60);
  rect(x, y, 10, 180, 3);
  fill(innerRGB);
  rect(x, y-34, 70, 48, 10);
  triangle(x-35, y-34, x+35, y-34, x, y+8);
}

function drawHairBack(x, y, c){
  fill(c);
  ellipse(x, y-22, 300, 240);
  ellipse(x-160, y+18, 140, 158);
  ellipse(x+160, y+18, 140, 158);
  ellipse(x-90, y+hairLen, 90, hairLen);
  ellipse(x+90, y+hairLen, 90, hairLen);
}

function drawFrontHair(x, y, len, c){
  fill(c);
  arc(x, y-72, 130, 118, PI+0.1, TWO_PI-0.2);
  arc(x-62, y-72, 110, 96, PI+0.2, TWO_PI-0.6);
  arc(x+62, y-72, 118, 96, PI+0.6, TWO_PI-0.1);
  stroke(255,16); strokeWeight(2);
  let i=0;
  while(i<5){
    let ox=-40+i*20;
    bezier(x+ox, y-74, x+ox-10, y-84, x+ox+10, y-96, x+ox, y-108);
    i++;
  }
  noStroke();
}

function drawBrows(x, y, tilt, c){
  fill(c);
  rect(x-58, y-56, 84, 14, 7);
  rect(x+58, y-56, 84, 14, 7);
  stroke(red(c),green(c),blue(c),160); strokeWeight(2);
  line(x-80, y-56+tilt*0.3, x-36, y-56-tilt*0.1);
  line(x+36, y-56+tilt*0.1, x+80, y-56-tilt*0.3);
  noStroke();
}

function drawEyes(x, y, gx, gy, irisC, lidC){
  const bx=x-58, by=y-36, bx2=x+58;
  const blinkScale=1.0-0.8*pow(blinkPhase,4);
  noStroke(); fill(255);
  ellipse(bx,by,86,46*blinkScale);
  ellipse(bx2,by,86,46*blinkScale);
  fill(irisC);
  ellipse(bx+constrain(gx,-8,8),by+constrain(gy,-6,6),34,34*blinkScale);
  ellipse(bx2+constrain(gx,-8,8),by+constrain(gy,-6,6),34,34*blinkScale);
  fill(20);
  ellipse(bx+constrain(gx,-8,8),by+constrain(gy,-6,6),14,14*blinkScale);
  ellipse(bx2+constrain(gx,-8,8),by+constrain(gy,-6,6),14,14*blinkScale);
  fill(255,230);
  ellipse(bx-8,by-8,6,6);
  ellipse(bx2-12,by-8,6,6);
  noFill(); stroke(lidC); strokeWeight(2);
  arc(bx,by-6,88,26,PI+0.2,TWO_PI-0.2);
  arc(bx2,by-6,88,26,PI+0.2,TWO_PI-0.2);
  arc(bx,by+10,70,18,0.9,2.25);
  arc(bx2,by+10,70,18,PI-2.25,PI-0.9);
  noStroke();
}

function drawMouth(x, y, curveAmt, lipC){
  fill(40,35,40,220);
  rectMode(CENTER);
  rect(x,y+54,50,6,3);
  fill(lipC);
  rect(x,y+58,44,12+curveAmt*0.2,5);
  fill(40,35,40,200);
  rect(x,y+56,30,3,2);
}

function drawGlassesTint(x, y, frameRGB, frameHSB, lensHSB){
  noStroke(); fill(frameRGB); rectMode(CENTER);
  rect(x-58, y-36, 112, 56, 8);
  rect(x+58, y-36, 112, 56, 8);
  colorMode(HSB,360,100,100,255);
  fill(frameHSB);
  colorMode(RGB,255,255,255,255);
  rect(x-58, y-36, 112, 56, 8);
  rect(x+58, y-36, 112, 56, 8);
  colorMode(HSB,360,100,100,255);
  fill(lensHSB);
  colorMode(RGB,255,255,255,255);
  rect(x-58, y-36, 100, 44, 7);
  rect(x+58, y-36, 100, 44, 7);
  stroke(frameRGB); strokeWeight(7);
  line(x-14, y-36, x+14, y-36);
  noStroke();
}

function drawCapHSB(x, y, tilt, c1, c2, dome){
  push();
  translate(x,y);
  rotate(radians(tilt));
  noStroke(); fill(c1);
  arc(0,30,300,70,PI,TWO_PI);
  fill(c2);
  arc(0,20,260,46,PI,TWO_PI);
  fill(dome);
  arc(0,0,260,150,PI,TWO_PI);
  fill(c1);
  ellipse(0,-50,18,18);
  rectMode(CENTER);
  rect(0,-28,6,32,3);
  triangle(-48,3, -54,21, -42,21);
  triangle(0,0, -8,18, 8,18);
  triangle(48,3, 42,21, 54,21);
  pop();
}

function mouseMoved(){
  gazeX = (mouseX - cx) * 0.03;
  gazeY = (mouseY - cy) * 0.03;
}

function mousePressed(){
  if (mouthCurve > 0) mouthCurve = -2;
  else mouthCurve = 6;
}

function mouseWheel(e){
  if (e.delta > 0) lensAlpha += 10;
  else lensAlpha -= 10;
  if (lensAlpha < 0) lensAlpha = 0;
  if (lensAlpha > 120) lensAlpha = 120;
  return false;
}

function doubleClicked(){
  baseHue = (baseHue + 90) % 360;
}

function keyPressed(){
  if (key==='S' || key==='s') saveCanvas('interactive_caricature','png');
  else if (key==='B' || key==='b') autoBlink = !autoBlink;
  else if (keyCode===LEFT_ARROW && mouthCurve > -6) mouthCurve -= 1;
  else if (keyCode===RIGHT_ARROW && mouthCurve < 10) mouthCurve += 1;
  else if (keyCode===UP_ARROW && browTilt < 20) browTilt += 1;
  else if (keyCode===DOWN_ARROW && browTilt > -20) browTilt -= 1;
  else if (key==='R' || key==='r') randomizeParams();
}

function randomizeParams(){
  faceW = random(160,200);
  faceH = random(200,230);
  hairLen = random(90,140);
  lensAlpha = random(30,100);
  const p = random(1);
  if (p < 0.33) mouthCurve = -2;
  else if (p < 0.66) mouthCurve = 4;
  else mouthCurve = 6;
  browTilt = random(-10,10);
}
