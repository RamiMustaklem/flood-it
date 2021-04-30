import express from 'express';
import { getGrid, createGrid } from '../../controllers/grid.controller';

const router = express.Router();

router
    .route('/')
    .get(getGrid)
    .post(createGrid);

export default router;
