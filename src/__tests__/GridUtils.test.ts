import { makeGrid, flood, IGridData } from '../utils/GridUtils';

describe('testing Grid utilities', () => {
  it('should create a new grid data object with grid structure', () => {
    const gridData = makeGrid();
    expect(gridData.grid).toHaveLength(6);
    for (let row of gridData.grid) {
      expect(row).toHaveLength(6);
    }
    expect(gridData.size).toEqual(6);
    expect(gridData.colors).toEqual(['red', 'green', 'blue']);
  });

  it('should flood the elements correctly and not solve', () => {
    const gridData: IGridData = {
      size: 6,
      solved: false,
      grid: [
        [0, 1, 2, 2, 2, 2],
        [0, 1, 2, 2, 2, 2],
        [0, 1, 2, 2, 2, 2],
        [0, 1, 2, 2, 2, 2],
        [0, 1, 2, 2, 2, 2],
        [0, 1, 2, 2, 2, 2],
      ],
      original: [
        [0, 1, 2, 2, 2, 2],
        [0, 1, 2, 2, 2, 2],
        [0, 1, 2, 2, 2, 2],
        [0, 1, 2, 2, 2, 2],
        [0, 1, 2, 2, 2, 2],
        [0, 1, 2, 2, 2, 2],
      ],
      seen: [
        [], [], [], [], [], [],
      ],
      colors: ['red', 'green', 'blue'],
    };

    const checkSolved = flood(1, gridData);
    expect(gridData.grid[0][0]).toBe(1);
    expect(checkSolved).toBeFalsy();
  });

  it('should flood the elements correctly and solve', () => {
    const gridData: IGridData = {
      size: 6,
      solved: false,
      grid: [
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 0],
        [2, 2, 2, 2, 2, 2],
        [2, 0, 2, 0, 2, 2],
      ],
      original: [
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 0],
        [2, 2, 2, 2, 2, 2],
        [2, 0, 2, 0, 2, 2],
      ],
      seen: [
        [], [], [], [], [], [],
      ],
      colors: ['red', 'green', 'blue'],
    };

    const checkSolved = flood(0, gridData);
    expect(gridData.grid[0][0]).toBe(0);
    expect(checkSolved).toBeTruthy();
    for (let row of gridData.grid) {
      for (let cell of row) {
        expect(cell).toEqual(0);
      }
    }
  });
});
