let tt = 0;
let baseCols = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 1);
  noStroke();
  for (let i = 0; i < 3; i++) baseCols[i] = color(random(360), 60, 90);
}

function draw() {
  tt = millis() / 1000.0;
  background(45, 10, 98);

  let a = tt * 0.7;
  let b = tt * 1.1;
  let c = tt * 0.5;

  let h1 = (25 + 120 * sin(a * 0.8)) % 360;
  fill(h1, 80, 100, 0.5);
  beginShape();
  vertex(40 + 5 * sin(a), 55 + 3 * cos(a));
  vertex(260 + 5 * sin(a), 60);
  vertex(120, 180 + 4 * sin(a * 1.2));
  endShape(CLOSE);

  let hMint = (190 + 160 * sin(b * 0.4)) % 360;
  fill(hMint, 40, 80, 0.45);
  let mintX = 70 + 10 * sin(b);
  let mintY = 180 + 6 * cos(b * 0.9);
  let mintW = 260 + 12 * sin(b * 0.8);
  let mintH = 110 + 6 * cos(b * 1.3);
  rect(mintX, mintY, mintW, mintH, 6);

  let hPurple = (280 + 140 * sin(c * 0.7)) % 360;
  fill(hPurple, 40, 95, 0.45);
  rect(420 + 5 * cos(c * 0.8), 40 + 8 * sin(c), 110, 170, 6);

  let hTri = (90 + 160 * sin(c * 0.6)) % 360;
  fill(hTri, 50, 70, 0.5);
  push();
  translate(520, 260);
  rotate(0.08 * sin(c * 0.9));
  beginShape();
  vertex(40, -130);
  vertex(72, 130 + 10 * sin(c));
  vertex(-100, -20);
  endShape(CLOSE);
  pop();

  fill((45 + 120 * sin(a)) % 360, 40, 100, 0.5);
  ellipse(95 + 8 * cos(a), 345 + 5 * sin(a), 100 + 10 * sin(a * 0.9));

  let hpink = (330 + 150 * sin(a * 1.1)) % 360;
  fill(hpink, 60, 100, 0.6);
  ellipse(300 + 12 * cos(a * 0.8), 340 + 8 * sin(a * 0.8), 70 + 12 * sin(a * 1.2));

  let hG1 = (130 + 150 * sin(b * 0.9)) % 360;
  fill(hG1, 60, 75, 0.5);
  ellipse(430 + 10 * cos(b), 260 + 8 * sin(b), 110 + 8 * sin(b * 1.1));

  let hG2 = (70 + 180 * sin(b * 0.7)) % 360;
  fill(hG2, 50, 65, 0.45);
  ellipse(460 + 12 * cos(b + 0.6), 260 + 6 * sin(b + 0.6), 120 + 10 * sin(b + 0.8));

  let hB = (210 + 150 * sin(c * 0.6)) % 360;
  fill(hB, 60, 100, 0.6);
  ellipse(520 + 8 * cos(c * 0.7), 120 + 7 * sin(c * 0.7), 110 + 10 * sin(c + 0.3));

  fill((35 + 150 * sin(a * 1.4)) % 360, 70, 100, 0.6);
  ellipse(210 + 6 * cos(a * 1.4), 115 + 5 * sin(a * 1.4), 60 + 8 * sin(a * 1.4));

  let hPoly = (0 + 120 * sin(c * 0.5)) % 360;
  fill(hPoly, 70, 90, 0.45);
  push();
  translate(320, 320);
  rotate(0.05 * sin(c * 0.8));
  scale(1.0 + 0.06 * sin(c * 0.8));
  beginShape();
  vertex(-200, -60);
  vertex(230, -10);
  vertex(200, 40);
  vertex(-220, 10);
  endShape(CLOSE);
  pop();

  fill((325 + 120 * sin(a * 1.1)) % 360, 60, 95, 0.55);
  rect(380, 200 + 8 * sin(a * 1.1), 180 + 12 * sin(a * 0.7), 120 + 10 * cos(a * 0.7), 6);

  stroke((0 + 120 * sin(c)) % 360, 20, 20, 0.8);
  strokeWeight(6);
  line(170, 310 + 8 * sin(c * 0.5), 540, 80 + 8 * sin(c * 0.5));

  stroke((345 + 150 * sin(c * 0.45 + 1.1)) % 360, 60, 70, 0.8);
  line(120, 210 + 10 * sin(c * 0.45 + 1.1), 560, 340 + 10 * sin(c * 0.45 + 1.1));
  noStroke();

  let faceX = width * 0.5;
  let faceY = height * 0.5 + 5 * sin(tt * 1.2);
  let faceD = 150 + 10 * sin(tt * 2.0);

  fill((260 + 120 * sin(tt * 0.6)) % 360, 50, 30);
  ellipse(faceX, faceY, faceD + 40, faceD + 40);

  fill((40 + 80 * sin(tt * 0.3)) % 360, 70, 95);
  ellipse(faceX, faceY, faceD, faceD);

  fill(30, 80, 20);
  ellipse(faceX - 25 + 1.2 * sin(tt * 3.1), faceY - 10, 12, 12);
  ellipse(faceX + 25 + 1.2 * sin(tt * 2.9), faceY - 10, 12, 12);

  for (let i = -4; i <= 4; i++) {
    let ang = map(i, -4, 4, -0.9, 0.9);
    ellipse(faceX + 22 * ang, faceY + 24 + 1.5 * sin(tt * 2 + i * 0.3), 6, 6);
  }
}

function keyPressed() {
  if (key === 's') {
    saveGif('myArt', 10);
  }
}
