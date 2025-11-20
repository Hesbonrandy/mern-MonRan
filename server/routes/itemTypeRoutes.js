import express from 'express';
import {
  getItemTypes,
  getItemTypeById,
  createItemType,
  updateItemType,
  deleteItemType
} from '../controllers/itemTypeController.js';
import {
  validateItemType,
  validateId,
  handleValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getItemTypes)
  .post(validateItemType, handleValidationErrors, createItemType);

router.route('/:id')
  .get(validateId, handleValidationErrors, getItemTypeById)
  .put(validateId, validateItemType, handleValidationErrors, updateItemType)
  .delete(validateId, handleValidationErrors, deleteItemType);

export default router;