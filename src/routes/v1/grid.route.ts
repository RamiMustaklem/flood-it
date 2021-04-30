import express from 'express';
import { getGrid, createGrid, updateGrid } from '../../controllers/grid.controller';

const router = express.Router();

router
    .route('/')
    .get(getGrid)
    .post(createGrid)
    .put(updateGrid);

export default router;
