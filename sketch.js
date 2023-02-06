//properties
let canvasWidth = 900;
let canvasHight = 500;
let fibonacci = [];
let f = 0.0;//noise
let f2 = 0.0;//noise
let state3txtSize = 50;
let img = [];

//data marks
let gapMark = " ";
let rowData;
let idx = 0;
let currIdx = 0;
let x = 0, y = 0;
let titleRow = 1;

//data
let data_year = [];
let data_month = [];
let data_degreeMin = [];
let data_degreeMax = [];
let data_airForce = [];
let data_rain = [];
let data_sunHours = [];

//draw
let counter = 0;
let picCounter = 0;

//interaction
let loadingSpeed = 25;
let isState = 1;
let isOnece = false;
let isOnece8 = false;


function preload() {
  img[0] = loadImage('00.jpg');
  img[1] = loadImage('01.jpeg');
  img[2] = loadImage('02.jpg');
  img[3] = loadImage('03.jpg');
  img[4] = loadImage('04.jpg');
  img[5] = loadImage('05.jpg');
  img[6] = loadImage('06.jpg');
  img[7] = loadImage('07.jpg');
  img[8] = loadImage('08.jpg');
  img[9] = loadImage('09.jpg');
}

function setup() {
  createCanvas(canvasWidth, canvasHight);
  background(0);
  noStroke();

  rowData = loadStrings("HeathrowWeather.txt");

  textAlign(LEFT);
  textSize(20);
  //fill(0);

  frameRate(10);
}
function draw() {
  switch (isState) {
    case 1:
      state_1_loading(frameCount);
      break;
    case 2:
      state_2_accessing(frameCount);
      break;
    case 3:
      state_3_entry();
      break;
    case 4:
      state_4_starting();
      break;
    case 5:
      state_5_initializing(frameCount);
      break;
    case 6:
      state_6_matching(frameCount);
      break;
    case 7:
      fadeOut(frameCount);
      state_7_Overviewing(frameCount);
      break;
    case 8:
      if(isOnece8===false){
         reset();
         isOnece8=true;
      }
      state_8_presenting();
      break;
  }


  f += 0.01;
  f2 += 0.04;

}
function reset(){
  idx = 0;
  currIdx = 0;
  x = 0, y = 0;
  titleRow = 1;
}
function fadeOut(timer) {
  if (timer < 100) {
    background(0, 0, 0, 10 * (timer % 10));
  }
  else {
    counter = 0;
    return true;
  }
}
function mouseClicked() {

  fadeOut(frameCount, 6);
  isState += 1;
  if (isState > 8) {
    isState = 1;
  }

}
function state_1_loading(timer) {
  titlePrint(x, y);
  fill(71, 55, 27);
  let edge = 50;//the starting point of progress bar  is the same
  rect(edge, edge * 3, canvasWidth - edge * 2, 10);

  if (timer * loadingSpeed + edge < canvasWidth - edge) {
    fill(165, 144, 23);
    rect(edge, edge * 3, timer * loadingSpeed, 10);
  }
  else {
    fill(165, 144, 23);
    rect(edge, edge * 3, canvasWidth - edge * 2, 10);
    //alert('aaaaa');
    generalPrint(timer, 5);
  }

}
function state_2_accessing(timer) {
  // if (timer % 3 == 0) {
  background(0);


  translate(canvasWidth / 2, canvasHight / 2);
  rotate(-PI / 6 * timer);
  fibonacciDraw(timer, 2);
  // }
}
function state_3_entry() {

  /* button = createButton("ENTER?"); 
   button.style("padding-left", "20px");
   button.style("padding-right", "20px");
   button.style("padding-top", "10px");
   button.style("padding-bottom", "10px");
   button.style("font-size", "30px");
   button.center();
   button.mousePressed(btnInteraction);
 
       button.remove();*/


  fill(8, 78, 189);
  stroke(255);
  strokeWeight(1);
  if (state3txtSize >= 50 && state3txtSize < 100) {
    textSize(state3txtSize++);
  }
  else if (state3txtSize >= 100) {
    textSize(state3txtSize--);
  }
  else if (state3txtSize < 50) {
    textSize(state3txtSize++);
  }

  // textAlign(CENTER);
  text("ENTER?", canvasWidth / 2, canvasHight / 2);

}
function state_4_starting() {
  if (isOnece === false) {
    background(0);
    isOnece = true;
  }

  stroke(255, 255, 255, generate('opacity'));
  noFill();
  squareDraw();
  /* if (counter >= 150) {
     isState4 = false;
     isState5 = true;
   }*/
}
function state_5_initializing(timer) {
  background(0);
  textSize(20);
  fill(255);
  noStroke();
  //if (timer % 20 == 0) {
  //currIdx = readWord(10);
  //checkWord(rowData[currIdx], true);
  checkWord(rowData[timer], true);
  //}

}
function state_6_matching(timer) {
  background(0);

  translate(canvasWidth / 2, canvasHight / 2);
  rotate(-PI / 6 * timer);
  fibonacciDraw(timer, 6);

}
function state_7_Overviewing(timer) {

  let n = timer % 10;
  if (n == 0) {
    picCounter++;
    if (picCounter <= 5) {
      background(0);
      image(img[picCounter - 1], 100 * picCounter, canvasHight / 6);
    }
    else if (picCounter > 5 && picCounter <= 10) {
      background(0);
      image(img[picCounter - 1], 100 * (picCounter - 5), canvasHight / 2);
    }
    else {
      picCounter = 0;
    }

  }



}
function state_8_presenting() {
  //alert("oh dear");
  background(0);
  strokeWeight(1);
  noFill();
  currIdx = readWord(893);
  checkWord(rowData[currIdx], false);
  dataDraw(rowData[currIdx]);
}

function generalPrint(timer) {

  textSize(20);
  fill(90, 140, 24);

  if (timer % 10 == 0 && titleRow <= 5) {
    text(rowData[titleRow], x + 90, y + 110 + 3 * timer);
    titleRow++;
  }

}

function squareDraw() {
  square(generate('x'), generate('y'), generate('size'));
  counter++;
}
function titlePrint(x, y) {
  //fill(148, 30, 90);
  fill(165, 144, 23);
  textSize(35);
  text(rowData[0], x + 55, y + 110);
  //text(rowData[5], x + 100, y + 50);
  // text(rowData[currIdx], x + 100, y + 100);

}
function readWord(end) {
  // only animate every 10 frames, so it's not too fast
  if (idx != null && idx < end && frameCount % 10 == 0) {
    idx++;
  }
  else if (idx >= end) {
    //idx = start+1;
    idx = null;
  }
  return idx;
}
function checkWord(rowIdx, yes) {
  //print(word.length);
  //i is charactor number of each row
  for (let i = 0; i < rowIdx.length; i++) {
    let splitRow = split(rowIdx, '   ');


    dataArrange(splitRow, rowIdx, yes);

  }
}
function btnInteraction() {
  alert("welcome!");

}

function nioseDraw() {
  //noise draw
  beginShape();
  stroke(255, 229, 255, 70);
  let n = noise(f) * width;
  let n2 = noise(f2) * width;
  line(n - 500, 0, n, canvasHight);
  line(n2 + 500, 0, n2, canvasHight);
  endShape();
}

function fibonacciDraw(timer, flag) {
  //draw 20 arc of 90 degree
  for (var i = 0; i < 20; i++) {
    var a = i <= 1 ? 1 : fibonacci[i - 1] + fibonacci[i - 2];
    fibonacci.push(a);


    if (flag === 6) {
      if (timer % 10 == 0) {
        stroke(255, 223, 6);
      }
    }
    else {
      stroke(255);

    }

    strokeWeight(1);
    noFill();
    arc(0, 0, a * 2, a * 2, 0, PI / 2);

    ////////add
    textSize(20);
    fill(timer % 255, 23, 56);
    noStroke();
    currIdx = readWord(7, 893);
    text(rowData[currIdx], 0, 0);
    if (currIdx >= 893) currIdx = 7;
    nioseDraw();



    rotate(PI / 2);
    translate(-fibonacci[i - 1], 0);
  }
}

function dataArrange(splitRowText, row, yes) {
  data_year[row] = splitRowText[1];
  data_month[row] = splitRowText[2];
  data_degreeMax[row] = splitRowText[3];
  data_degreeMin[row] = splitRowText[4];
  data_airForce[row] = splitRowText[6];
  data_rain[row] = splitRowText[7];
  data_sunHours[row] = splitRowText[8];


  if (yes) {
    fill(90, 140, 24);
    //randomPrint(data_degreeMax[row]);
    randomPrint(data_degreeMin[row]);
    randomPrint(data_airForce[row]);
    randomPrint(data_rain[row]);
  }



}
function randomPrint(content) {
  text(content, generate('x'), generate('y'));
}
function dataDraw(row) {
  fill(150);
  notePrint(canvasWidth - 350, canvasHight - 360, 'Year: ', data_year[row]);
  notePrint(canvasWidth - 350, canvasHight - 330, 'Month: ', data_month[row]);


  sunHoursDraw(data_sunHours[row]);
  airForceDraw(data_airForce[row]);
  rainDraw(data_rain[row]);
  degreeMaxDraw(data_degreeMax[row]);
  degreeMinDraw(data_degreeMin[row]);

}
function degreeMaxDraw(max) {

  fill(232, 78, 67);
  strokeWeight(20);
  arc(canvasWidth / 3, canvasHight / 2, 170, 170, 1.5 * PI, 1.5 * PI + 2 * PI / 15 * max);
  notePrint(canvasWidth - 350, canvasHight - 270, 'Max degree: ', max);
}

function degreeMinDraw(min) {
  fill(138, 223, 249);
  strokeWeight(20);
  line(50, canvasHight, 50, canvasHight - 200 / min);//y=200/x
  arc(canvasWidth / 3, canvasHight / 2, 130, 130, 1.5 * PI, 1.5 * PI + 2 * PI / 15 * min);
  notePrint(canvasWidth - 350, canvasHight - 240, 'Min degree: ', min);

}
function airForceDraw(af) {
  fill(82, 178, 136);
  notePrint(canvasWidth - 350, canvasHight - 300, 'Air Force: ', af);
  arc(canvasWidth / 3, canvasHight / 2, 230, 230, 1.5 * PI, 1.5 * PI + 2 * PI / 15 * af);
}
function rainDraw(rain) {
  fill(224, 244, 252);
  for (let i = 0; i < rain * 10; i++) {
    ellipse(generate('x'), generate('y'), 5);
  }
  notePrint(canvasWidth - 350, canvasHight - 210, 'Rain: ', rain);

  for (let i = 0; i < 80; i++) {
    fill(102, 181, 233);
    ellipse(generate('x'), canvasHight - rain / 2, generate('ellipseRadius_big'));
  }

  for (let i = 0; i < 80; i++) {
    fill(82, 139, 178);
    ellipse(generate('x'), canvasHight + 30, generate('ellipseRadius_big'));
  }

}
function sunHoursDraw(hours) {
  fill(178, 159, 82);
  //only when after 1957 have data
  // ellipse(canvasWidth, 0, hours + 50);
  arc(canvasWidth / 3, canvasHight / 2, 260, 260, 1.5 * PI, 1.5 * PI + 2 * PI / 15 * hours);
  notePrint(canvasWidth - 350, canvasHight - 180, 'Sun Hours: ', hours);

}

function notePrint(theX, theY, name, content) {
  noStroke();
  rect(theX, theY, 10);
  text(name, theX + 15, theY + 10);
  text(content, theX + 150, theY + 10);
}


function generate(name) {
  switch (name) {
    case 'ellipse':
      return Math.floor(random(0, 2 * PI));
    case 'x':
      return Math.floor(random(0, canvasWidth));
    case 'y':
      return Math.floor(random(0, canvasHight));
    case 'ellipseRadius':
      return Math.floor(random(1, 25));
    case 'size':
      return Math.floor(random(1, 80));
    case 'opacity':
      return Math.floor(random(0, 100));
    case 'ellipseRadius_big':
      return Math.floor(random(50, 180));
  }
}