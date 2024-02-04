function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
        // Fill the array with 0s
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

// The grid
let grid;
// How big is each square?
let w = 5;
let cols, rows;

let hueValue = 200;

function setup() {
    createCanvas(600, 800);
    colorMode(HSB, 360, 255, 255);
    cols = width / w;
    rows = height / w;
    grid = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
    grid[20][10] = 1;

}

function mouseDragged() {
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / w);

    let matrix = 3;
    let extent = floor(matrix / 2);
    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        if (random(1) < 0.75) {
          let col = mouseCol + i;
          let row = mouseRow + j;
          if (col >= 0 && col <= cols -1 && row >= 0 && row <= rows -1) {
            grid[col][row] = hueValue;
          }
        }
    }
    hueValue += 1;
    if (hueValue >= 360) {
        hueValue = 0;
    }
}
};

function draw() {
    background(100);

    // Draw the sand
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            noStroke();
            if (grid[i][j] > 0) {
                fill(grid[i][j], 255, 255);
                //fill(grid[i][j] * 255);
                let x = i * w;
                let y = j * w;
                square(x, y, w);
            }
        }
        let nextGrid = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];
                if (state > 0) {
                    let below = grid[i][j + 1];

                    let dir = random([-1, 1]);

                    let belowA = -1;
                    let BelowB = -1;
                    if (i + dir >= 0 && i + dir <= cols - 1) {
                        belowA = grid[i + dir][j + 1];
                    }
                    if (i - dir >= 0 && i - dir <= cols - 1) {
                        belowB = grid[i - dir][j + 1];
                    }
                    if (j == rows - 1) {
                        nextGrid[i][j] = state;
                    } else if (below === 0) {
                        nextGrid[i][j + 1] = state;
                    } else if (belowA === 0) {
                        nextGrid[i + dir][j + 1] = state;
                    } else if (belowB === 0) {
                        nextGrid[i - dir][j + 1] = state;
                    } else {
                        nextGrid[i][j] = state;
                    }
                }
            }
        }
        grid = nextGrid;
    }
}
