import express from 'express';
import { getAllTrees, addTree, editTree, deleteTree, searchTrees, sortTrees, getTotalPrice } from '../controllers/treeController.js';

const router = express.Router();

router.get('/', getAllTrees);
router.post('/', addTree);
router.put('/:id', editTree);
router.delete('/:id', deleteTree);
router.get('/search', searchTrees);
router.get('/sort', sortTrees);
router.get('/total-price', getTotalPrice);

export default router;
