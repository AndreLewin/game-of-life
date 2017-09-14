const MAX_LENGTH = 20;
const MAX_HEIGHT = 20;
const PROBABILITY_ALIVE = 1/4;

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

// Take immutable nested List, return immutable nested List
const calculateGridNextGen = (grid) => {
    return newGrid;
};