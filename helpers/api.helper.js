
const success = (res, data = {}, message = '', meta = {}) => res.status(200).json({
  success: true,
  data,
  message,
  meta,
  errors: [],
});

const failure = (res, errors = [], message = 'Something went wrong !', errorStatus = 500) => res.status(errorStatus).json({
  success: false,
  data: {},
  message,
  meta: {},
  errors,
});

const failureSuccess = (res, data = {}, message = '', meta = {}) => res.status(200).json({
  success: false,
  data,
  message,
  meta,
  errors: [],
});

module.exports = {
  success,
  failure,
  failureSuccess
};
