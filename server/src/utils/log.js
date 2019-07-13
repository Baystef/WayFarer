import debug from 'debug';

/**
 * @description logs messages for easy debugging
 * @param {String} message log message
 */
export default function logger(message) {
  return debug('dev')(message);
}
