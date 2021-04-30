import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

export const getGrid = catchAsync(async (req: Request, res: Response) => {
    res.status(httpStatus.FOUND).send({ grid: 'grid is goooood' });
});

export const createGrid = catchAsync(async (req: Request, res: Response) => {
    res.status(httpStatus.CREATED).send({ grid: '' });
});
