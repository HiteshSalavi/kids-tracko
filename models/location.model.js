const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { model: MODELS, global: GLOBAL } = require('../constants');
const secret = require('../configs/env.config').SECRET;

const LocationSchema = new mongoose.Schema({
  watchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODELS.Watch,
    index: true,
    required: true
  },
  geoFense: {  // Unit Kms
    type: Number,
    // default: 10  // To provide 10 Km default geoFense
  },
  locationGeometry: {
    type: {
        type: String
    },
    coordinates: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Considering that Most of the time, querying would be in the decendiing order based on watchId
LocationSchema.index({
  watchId: true,
  createdAt: -1
}, {
  watchId: true,
  createdAt: 1
});

LocationSchema.index({
  locationGeometry: "2dsphere"
});

LocationSchema.methods.toJson = function () { // eslint-disable-line
  const obj = {
    _id: this._id, // eslint-disable-line
    geoFense: this.geoFense,
    locationGeometry: this.locationGeometry,
  };
}

mongoose.model(MODELS.Location, LocationSchema);
