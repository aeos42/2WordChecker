// Cell.js

class Cell {
  constructor(row, col) {
    this.letter = "9";
    this.boxColor = color(255); 
    this.row = row;
    this.col = col;
    this.checked = false;
    }
    
    displayCell() {
      noStroke();
      fill(this.boxColor);
      rect(this.row * RESOLUTION, this.col * RESOLUTION, RESOLUTION, RESOLUTION);
      fill(0); //text color
      textAlign(CENTER);
      text(this.letter, this.row * RESOLUTION + 12, this.col * RESOLUTION + 14);
      //console.log(this);
    }
    
  }