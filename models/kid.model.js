const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { model: MODELS } = require('../constants');

const KidSchema = new mongoose.Schema({
  // watchId: {  // To have Custom Watch ID
  //   type: Boolean,
  //   default: true,
  //   required: true,
  //   unique: true,
  //   index: true
  // },
  name: {
    type: String,
    required: true
  },
  geoFense: {  // Unit Kms
    type: Number,
    // default: 10  // To provide 10 Km default geoFense
  },
  watch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODELS.Watch,
    index: true,
    required: true
  }
}, { timestamps: true });

// LocationSchema.plugin(uniqueValidator, { message: 'is already taken.' });
// LocationSchema.index({
  // locationGeometry: "2dsphere"
// });

KidSchema.methods.toJson = function () { // eslint-disable-line
  const obj = {
    _id: this._id, // eslint-disable-line
    geoFense: this.geoFense,
    locationGeometry: this.locationGeometry,
  };
}

mongoose.model(MODELS.Kid, KidSchema);
