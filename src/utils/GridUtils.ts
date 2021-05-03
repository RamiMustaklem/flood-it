type Color = 'red' | 'green' | 'blue';

interface IGridData {
    size: number;
    solved: boolean;
    grid: [number[]];
    original: [number[]];
    seen: [boolean[]];
    colors: Color[]
}

/**
 * Initialize the grid with its default initial values
 * @return gridData IGridData
 */
export function makeGrid() {
    const gridData: IGridData = {
        size: 6,
        solved: false,
        grid: [[]],
        original: [[]],
        seen: [[]],
        colors: ['red', 'green', 'blue'],
    };

    const { size, grid, original, seen, colors } = gridData;

    for(let i = 0; i < size; i++) {
        grid[i] = [];
        original[i] = [];
        seen[i] = [];
    }

    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            const rand =  Math.floor(Math.random() * colors.length);
            grid[i][j] = rand;
            original[i][j] = rand;
        }
    }

    return gridData;
}

/**
 * Clears the seen positions during flooding
 * @param gridData IGridData
 */
function clearSeen(gridData: IGridData) {
    const { size, seen } = gridData;

    for(let i = 0; i < size; i++)
        for(let j = 0; j < size; j++)
            seen[i][j] = false;
}

/**
 * Resets the game
 * Expose an API endpoint to call this function to reset the game to its original state
 */
export function reset(gridData: IGridData) {
    const { size, grid, original } = gridData;

    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            grid[i][j] = original[i][j];
        }
    }
}

/**
 * Counts the connect cells and returns the number
 * @param index1 number
 * @param index2 number
 * @param color number - The chosen color index
 * @param gridData IGridData
 * @return count number
 */
const countConnected = (index1: number, index2: number, color: number, gridData: IGridData): number => {
    const { size, grid, seen } = gridData;

    if (index1 < 0 || index2 < 0 || index1 >= size || index2 >= size || seen[index1][index2] || grid[index1][index2] != color) {
        return 0;
    }

    seen[index1][index2] = true;

    return countConnected(index1, index2 - 1, color, gridData) +
        countConnected(index1, index2 + 1, color, gridData) +
        countConnected(index1 - 1, index2, color, gridData) +
        countConnected(index1 + 1, index2, color, gridData) + 1;
};


/**
 * Counts the flooded cells and return the number
 * @param index1
 * @param index2
 * @param original
 * @param replace
 * @param gridData
 * @return count number
 */
const countFlooded = (index1: number, index2: number, original: number, replace: number, gridData: IGridData): number => {
    const { size, grid, seen } = gridData;

    if (index1 < 0 || index2 < 0 || index1 >= size || index2 >= size || seen[index1][index2]) {
        return 0;
    }

    seen[index1][index2] = true;

    if (grid[index1][index2] === original) {
        grid[index1][index2] = replace;

        return 1 + countFlooded(index1, index2 + 1, original, replace, gridData) +
            countFlooded(index1, index2 - 1, original, replace, gridData) +
            countFlooded(index1 + 1, index2, original, replace, gridData) +
            countFlooded(index1 - 1, index2, original, replace, gridData);
    } else if (grid[index1][index2] === replace) {
        // Unmark this cell for countConnected.
        seen[index1][index2] = false;
        return countConnected(index1, index2, replace, gridData);
    }

    return 0;
};

/**
 * This is the flood function
 * @param colorIndex
 * @param gridData
 * @return checkSolved boolean - If the grid is solved or not
 */
export function flood(colorIndex: number, gridData: IGridData): boolean {
    const { size, grid } = gridData;

    if (grid[0][0] == colorIndex) {
        return false;
    }

    clearSeen(gridData);

    // Check if number of cells flooded is equal to size of grid.
    const countFloodedNumber = countFlooded(0, 0, grid[0][0], colorIndex, gridData);
    const checkSolved = countFloodedNumber === size * size;

    gridData.solved = checkSolved;
    return checkSolved;
}
