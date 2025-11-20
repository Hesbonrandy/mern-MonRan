import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  itemType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ItemType',
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);