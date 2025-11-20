import express from 'express';
import {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuItemController.js';

import {
  validateMenuItem,
  validateId,
  handleValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getMenuItems)
  .post(validateMenuItem, handleValidationErrors, createMenuItem);

router.route('/:id')
  .get(validateId, handleValidationErrors, getMenuItemById)
  .put(validateId, validateMenuItem, handleValidationErrors, updateMenuItem)
  .delete(validateId, handleValidationErrors, deleteMenuItem);

export default router;