const MAX_LENGTH = 20;
const MAX_HEIGHT = 20;
const PROBABILITY_ALIVE = 1/6;

export const createRandomGrid = () => {
    const grid = new Array(MAX_HEIGHT);
    for (let i = 0; i < MAX_HEIGHT; i++) {
        grid[i] = new Array(MAX_LENGTH);
        for (let j = 0; j < MAX_LENGTH; j++) {
            grid[i][j] = Math.random() < PROBABILITY_ALIVE;
        }
    }
    return grid;
};

export const createEmptyGrid = () => {
    const grid = new Array(MAX_HEIGHT);
    for (let i = 0; i < MAX_HEIGHT; i++) {
        grid[i] = new Array(MAX_LENGTH);
        for (let j = 0; j < MAX_LENGTH; j++) {
            grid[i][j] = false;
        }
    }
    return grid;
};

export const calculateGridNextGen = (grid) => {
    const nextGrid = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < MAX_HEIGHT; i++) {
        for (let j = 0; j < MAX_LENGTH; j++) {
            const nbNeighbors = calculateNeighbors(grid, i, j);
            nextGrid[i][j] = (nbNeighbors === 3) || (nbNeighbors === 2 && grid[i][j] === true);
        }
    }
    return nextGrid;
};

const calculateNeighbors = (grid, i, j) => {
    let nbNeighbors = 0;

    if (grid[sphereGrid(i-1)][sphereGrid(j-1)])
        nbNeighbors++;
    if (grid[sphereGrid(i-1)][sphereGrid(j)])
        nbNeighbors++;
    if (grid[sphereGrid(i-1)][sphereGrid(j+1)])
        nbNeighbors++;
    if (grid[sphereGrid(i)][sphereGrid(j-1)])
        nbNeighbors++;
    if (grid[sphereGrid(i)][sphereGrid(j+1)])
        nbNeighbors++;
    if (grid[sphereGrid(i+1)][sphereGrid(j-1)])
        nbNeighbors++;
    if (grid[sphereGrid(i+1)][sphereGrid(j)])
        nbNeighbors++;
    if (grid[sphereGrid(i+1)][sphereGrid(j+1)])
        nbNeighbors++;

    return nbNeighbors;
};

const sphereGrid = (x) => {
    if (x >= MAX_HEIGHT) {
        return 0;
    } else if (x < 0) {
        return MAX_HEIGHT - 1;
    } else {
        return x;
    }
};