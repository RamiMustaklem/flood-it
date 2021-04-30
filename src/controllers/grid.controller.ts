import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { readData, writeData } from '../utils/ioUtils';
import { makeGrid, flood } from '../utils/GridUtils';

const COLORS = ['red', 'green', 'blue'];

export const getGrid = catchAsync(async (req: Request, res: Response) => {
    const gridData = await readData('grid');

    if (!gridData) {
        throw new ApiError(httpStatus.NO_CONTENT, `gridData is empty!`);
    }

    res.status(httpStatus.FOUND).send({ gridData });
});

export const createGrid = catchAsync(async (req: Request, res: Response) => {
    const gridData = makeGrid();
    await writeData('grid', gridData);
    res.status(httpStatus.CREATED).send({ gridData });
});

export const updateGrid = catchAsync(async (req: Request, res: Response) => {
    const { color } = req.body;

    if (COLORS.indexOf(color) === -1) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Color provided is not supported!');
    }

    const gridData = await readData('grid');

    if (!gridData) {
        throw new ApiError(httpStatus.NO_CONTENT, `gridData is empty!`);
    }

    const checkSolved = flood(COLORS.indexOf(color), gridData);
    await writeData('grid', gridData);

    res.status(httpStatus.OK).send({ checkSolved, gridData });
});
