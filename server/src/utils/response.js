/**
 * @param {object} res response object
 * @param {Number} code status code
 * @param {object} data data object
 * @param {String} status status message
 */
const successResponse = (res, code, data, status = 'success') => res.status(code).json({
  status,
  data,
});

/**
 * @description All Error responses
 * @param {object} res response object
 * @param {String} error error message
 * @param {String} status status message
 */
const badRequestResponse = (res, error, status = 'error') => res.status(400).json({
  status,
  error: error || 'Bad request',
});

const unauthorizedResponse = (res, error, status = 'error') => res.status(401).json({
  status,
  error: error || 'Unauthorized',
});

const forbiddenResponse = (res, error, status = 'error') => res.status(403).json({
  status,
  error: error || 'Forbidden',
});

const nullResponse = (res, error, status = 'error') => res.status(404).json({
  status,
  error: error || 'NOT_FOUND',
});

const conflictResponse = (res, error, status = 'error') => res.status(409).json({
  status,
  error: error || 'Conflict',
});

const goneResponse = (res, error, status = 'error') => res.status(410).json({
  status,
  error: error || 'Gone',
});

const internalErrREesponse = (res, error, status = 'error') => res.status(500).json({
  status,
  error: error || 'Internal Server Error',
});

export {
  badRequestResponse, unauthorizedResponse, forbiddenResponse,
  nullResponse, conflictResponse, goneResponse, successResponse,
  internalErrREesponse,
};
