'use strict';
const minLength = 2;
const maxLength = 100;
const responseHelper = require('../../helpers/handle-response.helper');
module.exports.validateUrlParams = (req, res, done) => {
  // we can add validation when required
  // req.check('field1', 'field1 required.').notEmpty(); // .isLength({ min: 1 }).withMessage('Min length sould be 1.');
  // req.check('field2', 'Field2 required.').notEmpty(); //.isLength({ min: 1 }).withMessage('Min length sould be 1.');
  req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
          return responseHelper.ResponseMiddlewareBadParamError(
                res, {}, 'fields cannot be empty.',
                result.array()
              );
      }
      return done();
  });
}
