// 2 Word Checker
const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const HEIGHT = 600;
const WIDTH = 600;
const RESOLUTION = 24;

const ROWS = HEIGHT / RESOLUTION;
const COLS = WIDTH / RESOLUTION;

var words;
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
	return grid;
}

function randomLetter(_letters) {
  return _letters[floor(random(_letters.length))]
}

//returns the first cell
function initCell() {
  var row = floor(random(cellGrid.length));
  var col = floor(random(cellGrid[0].length));

  var firstCell = cellGrid[row][col];

  firstCell.row = row;
  firstCell.col = col;
  firstCell.letter = randomLetter(LETTERS);
  firstCell.checked = true;
  console.log(firstCell);
  return firstCell;
}

//pushes a cell into the global drawCells
function pushCell(cell)
{
  drawCells.push(cell);
}

function preload() {
  words = loadStrings("twowords.txt");
  wordMap = new Map();

  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].toLowerCase();
  }
}

function setup() {
  createCanvas(600, 600);
  background(100);

  cellGrid = makeGrid(ROWS, COLS);
  textSize(10);
  textFont('Georgia');
  //draws one frame a second
  frameRate(1);

  var initialCell = initCell();
  initialCell.displayCell();
  pushCell(initialCell);
}

function draw() {

  addLetters(drawCells);

  for (let i = 0; i < drawCells.length; i++) {
    drawCells[i].displayCell();
  }
  

}

//returns true if valid coordinates
function isInBounds(coords) {
  var rowCheck = (coords[0] >= 0) && (coords[0] < ROWS);
  var colCheck = (coords[1] >= 0) && (coords[1] < COLS);

  return (rowCheck && colCheck)
}

//adds letters to the global list drawCells
function addLetters(_drawCells) {
  
  for (let i = 0; i < _drawCells.length; i++) {
    //get index-valid neighbors
    var curRow = drawCells[i].row;
    var curCol = drawCells[i].col;

    let adjacentCoords = [[curRow-1, curCol],
                          [curRow, curCol+1],
                          [curRow+1, curCol],
                          [curRow, curRow-1],
                          ]

    let validCoords = adjacentCoords.filter(isInBounds);

    for (let j = 0; j < validCoords.length; j++) {
      let checkRow = validCoords[j][0];
      let checkCol = validCoords[j][1];
    
      // if we haven't visited this cell before
      if (!cellGrid[checkRow][checkCol].checked) {
        var canFormWord = formWord(_drawCells[i].letter);
        if (canFormWord != false) {
          cellGrid[checkRow][checkCol].letter = canFormWord;
          cellGrid[checkRow][checkCol].checked = true;
          cellGrid[checkRow][checkCol].row = checkRow;
          cellGrid[checkRow][checkCol].col = checkCol;
          pushCell(cellGrid[checkRow][checkCol]);
        }
      }
    }
  }
}

function formWord(startLetter) {
  //words global
  for (var i = 0; i < words.length; i++) {
    //don't know why lowercase not working above in preload
    words[i] = words[i].toLowerCase();
    if (words[i].substring(0,1) == startLetter)  {
      wordMatch = words.splice(i,1);
      return wordMatch[0].substring(1);
    }
  }
  return false;
}

