const apiHelper = require('../../helpers/api.helper');
const { model: MODELS } = require('../../constants');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const Watch = mongoose.model(MODELS.Watch);

const getWatches = async (req, res) => { // FIX: Either POST request or Pagination
  try{
    let watches = await Watch.find();
    return apiHelper.success(res, watches, '');
  } catch (err) {
    return apiHelper.failure(res, [err], err.message);
  }
};

const getWatchById = async (req, res) => {
  try {
    validationResult(req).throw();

    let watchId = req.params.watchId;
    let watch = await Watch.findOne({_id: watchId});
    if (watch) {
      return apiHelper.success(res, watch, '');
    }
    return apiHelper.failure(res, [], 'Watch Not Found', 404);
  } catch (err) {
    return apiHelper.failure(res, [err], err.message);
  }
};

const setWatch = async (req, res) => {
  try {
    let watch = new Watch();
    watch = await watch.save();
    return apiHelper.success(res, watch, 'Watch saved successfully');
  } catch (err) {
    return apiHelper.failure(res, [err], err.message);
  }
};


module.exports = {
  getWatches: getWatches,
  getWatchById: getWatchById,
  setWatch: setWatch
};