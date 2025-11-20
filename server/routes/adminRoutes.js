import express from 'express';
import { 
  hardReset, 
  softReset, 
  getBackups,
  restoreBackup 
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/reset/hard', hardReset);
router.post('/reset/soft', softReset);
router.get('/backups', getBackups);
router.post('/backups/restore/:filename', restoreBackup);

export default router;