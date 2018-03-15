// Cell.js
function Cell(_x, _y, _resolution, _index) {
  this.x = _x;
  this.y = _y;
  this.index = _index;
  this.resolution = _resolution;
  this.num;
  this.letter = letters[floor(random(letters.length))];
  this.color = color(255);

  this.display = function() {
    noStroke();
    fill(this.color);
    rect(this.x * this.resolution, this.y * this.resolution, this.resolution, this.resolution);
    this.drawLetter();
  }

  this.drawLetter = function() {
    fill(0);
    textAlign(CENTER);
    text(this.letter, this.x * this.resolution + 6, this.y * this.resolution + 10);
  }
}
