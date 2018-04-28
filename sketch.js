// 2 Word Checker
const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const HEIGHT = 600;
const WIDTH = 600;
const RESOLUTION = 24;

const ROWS = HEIGHT / RESOLUTION;
const COLS = WIDTH / RESOLUTION;

var cellGrid;
var cellQueue = [];
var drawCells = [];

//makes a 2d array of cell objects
function makeGrid(_rows, _cols) {
	var grid = [];

	for (var i = 0; i < _rows; i++) {
	  grid[i] = [];
	  for (var j = 0; j < _cols; j++) {
		  grid[i].push(new Cell());
	  }
  }
  console.log(grid);
	return grid;
}

function randomLetter(_letters) {
  return _letters[floor(random(_letters.length))]
}


function initLetter() {
  var row = floor(random(cellGrid.length));
  var col = floor(random(cellGrid[0].length));

  var firstCell = cellGrid[row][col];

  firstCell.row = row;
  firstCell.col = col;
  firstCell.letter = randomLetter(LETTERS);

  return firstCell;
}

function preload() {
  words = loadStrings("twowords.txt");
  
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].toLowerCase();
  }
}

function setup() {
  createCanvas(600, 600);

  cellGrid = makeGrid(ROWS, COLS);
  textSize(10);
  textFont('Georgia');
  //draws one frame a second
  frameRate(1);

  var initialCell = initLetter();
  initialCell.displayCell();
}

function draw() {
  //background(0);
  //addLetters();
  /*
  for (let i = 0; i < drawCells.length; i++) {
    drawCells[i].displayCell();
  }
  */

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
