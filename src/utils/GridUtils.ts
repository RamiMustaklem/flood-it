type Color = 'red' | 'green' | 'blue';

interface IGridData {
    size: number;
    solved: boolean;
    grid: [number[]];
    original: [number[]];
    seen: [boolean[]];
    colors: Color[]
}

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

function clearSeen(gridData: IGridData) {
    const { size, seen } = gridData;

    for(let i = 0; i < size; i++)
        for(let j = 0; j < size; j++)
            seen[i][j] = false;
}

/**
 * Resets the game
 */
function reset(gridData: IGridData) {
    const { size, grid, original } = gridData;

    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            grid[i][j] = original[i][j];
        }
    }
}

const countConnected = (i: number, j: number, c: number, gridData: IGridData): number => {
    const { size, grid, seen } = gridData;

    if (i < 0 || j < 0 || i >= size || j >= size || seen[i][j] || grid[i][j] != c) {
        return 0;
    }

    seen[i][j] = true;

    return countConnected(i, j - 1, c, gridData) +
        countConnected(i, j + 1, c, gridData) +
        countConnected(i - 1, j, c, gridData) +
        countConnected(i + 1, j, c, gridData) + 1;
};

const _flood = (i: number, j: number, original: number, replace: number, gridData: IGridData): number => {
    const { size, grid, seen } = gridData;

    if (i < 0 || j < 0 || i >= size || j >= size || seen[i][j]) {
        return 0;
    }

    seen[i][j] = true;

    if (grid[i][j] === original) {
        grid[i][j] = replace;

        return 1 + _flood(i, j + 1, original, replace, gridData) +
            _flood(i, j - 1, original, replace, gridData) +
            _flood(i + 1, j, original, replace, gridData) +
            _flood(i - 1, j, original, replace, gridData);
    } else if (grid[i][j] === replace) {
        // Unmark this cell for countConnected.
        seen[i][j] = false;
        return countConnected(i, j, replace, gridData);
    }

    return 0;
};

export function flood(c: number, gridData: IGridData) {
    const { size, grid } = gridData;
    let { solved } = gridData;

    if (grid[0][0] == c) {
        return false;
    }

    clearSeen(gridData);

    // Check if number of cells flooded is equal to size of grid.
    const countFlooded = _flood(0, 0, grid[0][0], c, gridData);
    const checkSolved = countFlooded === size * size;

    gridData.solved = solved;
    return checkSolved;
}
