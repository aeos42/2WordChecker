// 2 Word Checker
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function preload() {
  words = loadStrings("twowords.txt");
}

var cells = [];
let cols;
let rows;
let resolution = 12;
var myCell;

function setup() {
  createCanvas(600, 600);
  cols = width / resolution;
  rows = height / resolution;
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].toLowerCase();
  }
  noLoop();
  cells.push(new Cell(0, 0, resolution, 0));
  textSize(10);
  textFont('Georgia');
}

function draw() {
  background(0);

  for (let i = 0; i < cells.length; i++) {
    cells[i].display();
    if (i < 300) {
      createNewCell(cells[i]);
    }
  }
}

function createNewCell(c) {
  let newX;
  let newY;
  if (c.x * resolution == width) {
    newX = -(width / resolution);
    newY = 1;
  } else {
    newX = 1
    newY = 0;
  }

  let newCell = new Cell((c.x + newX), (c.y + newY), resolution, c.index += 1);

  if (c.index >= width / resolution) {
    // check for vertical and to the left
    let topLetter = x;
    let leftLetter = x;
    //?????????

  } else {

    let newWordArray = [];
    for (var i = 0; i < words.length; i++) {
      if (words[i].charAt(0) == c.letter) {
        newWordArray.push(words[i]);
      }
    }
    let randomWord = random(newWordArray);
    newCell.letter = randomWord.charAt(1);
  }
  if (newCell.letter != null) {
    cells.push(newCell);
  }
}
