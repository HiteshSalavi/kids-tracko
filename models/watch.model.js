const mongoose = require('mongoose');
const { model: MODELS } = require('../constants');

const WatchSchema = new mongoose.Schema({
  isProcured: {
    type: Boolean,
    default: false,
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
    required: true,
  }
}, { timestamps: true });

// WatchSchema.index({ isProcured: 'text', isValid: 'text' });

mongoose.model(MODELS.Watch, WatchSchema);
