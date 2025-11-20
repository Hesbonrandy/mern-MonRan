// server/models/ItemType.js
import mongoose from 'mongoose';

const itemTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true } // "Hot Drinks", "Pastries"
}, { timestamps: true });

export default mongoose.model('ItemType', itemTypeSchema);