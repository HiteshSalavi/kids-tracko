const apiHelper = require('../../helpers/api.helper');
const { model: MODELS } = require('../../constants');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const ObjectId = mongoose.Types.ObjectId;
const User = mongoose.model(MODELS.User);
const Kid = mongoose.model(MODELS.Kid);
const Watch = mongoose.model(MODELS.Watch);

const getParent = async (req, res) => {
  try {
    validationResult(req).throw();

    let user = await User.findOne({ _id: req.params.parentId });
    if (user) {
      return apiHelper.success(res, { user: user.toJson() }, '');
    }
    return apiHelper.failure(res, [], 'User Not Found', 404);
  } catch (err) {
    return apiHelper.failure(res, [err], err, 500);
  }
};

const getKids = async (req, res) => {
  try {
    validationResult(req).throw();

    const parentId = req.params.parentId;

    let user = await User.findOne({_id: parentId})
    if (user) {
      return apiHelper.success(res, { kids: user.kids }, 'Kids fetched successfully');
    }
    return apiHelper.failure(res, [], 'User Not Found', 404);
  } catch (err) {
    return apiHelper.failure(res, [err], err, 500);
  }
}

const saveKids = async (req, res) => {
  try {
    validationResult(req).throw();

    const parentId = req.params.parentId;
    const body = req.body;

    let query = [{$match: { _id: ObjectId(parentId) }}, { $unwind: '$watches' }, {$match: {watches: ObjectId(body.watch)}}];
    let user = await User.aggregate(query);
    if (user.length) {
      let kid = new Kid(body);
      await kid.save();
      kid = kid.toObject();
      console.log(kid);
      await User.findOneAndUpdate({ _id: parentId }, { $addToSet: { kids: kid._id } }, { useFindAndModify: false });
      return apiHelper.success(res, { kids: kid }, 'Kid saved successfully');
    }
    return apiHelper.failure(res, [], 'Parent User or specified watch not found');
  } catch (err) {
    return apiHelper.failure(res, [err], err, 500);
  }
}

const getWatches = async (req, res) => {
  try {
    validationResult(req).throw();

    const parentId = req.params.parentId;
    console.log(parentId);

    let user = await User.findOne({_id: parentId})//.populate({ path: 'watches', select: 'isProcured'});
    if (user) {
      return apiHelper.success(res, { watches: user.watches }, 'Watches fetched successfully');
    }
    return apiHelper.failure(res, [], 'User Not Found', 404);
  } catch (err) {
    return apiHelper.failure(res, [err], err, 500);
  }
}

const saveWatch = async (req, res) => {
  try {
    validationResult(req).throw();

    let parentId = req.params.parentId;
    let watchId = req.body.watchId;

    let watch = await Watch.findOneAndUpdate({
      _id: watchId,
      isProcured: false,
      isValid: true
    }, { isProcured: true }, { useFindAndModify: false });

    if (watch){
      await User.updateOne({ _id: parentId },
        {
          $addToSet: { watches: String(watch.toObject()._id) },
        });
      return apiHelper.success(res, {watch: watch}, 'Watch Added Successfully');
    }
    return apiHelper.failure(res, [], 'Provided watch is either invalid or already registered');
  } catch (err) {
    return apiHelper.failure(res, [err], err, 500);
  }
}

module.exports = {
  getParent: getParent,
  getKids: getKids,
  saveKids: saveKids,
  getWatches: getWatches,
  saveWatch: saveWatch
};