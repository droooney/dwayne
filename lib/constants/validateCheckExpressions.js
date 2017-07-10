/**
 * @module constants/validateCheckExpressions
 * @private
 * @description Exports different types of validate expressions for {@link module:helpers/validate}.
 */

import * as methods from '../helpers/checkTypes';

/**
 * @callback checkValidityCallback
 * @private
 * @param {*} value - Value to check.
 */

/**
 * @typedef {Object} validateExpr
 * @private
 * @property {String} text - Text of the thrown error.
 * @property {Error} error - Type of the thrown error.
 * @property {checkValidityCallback} check - Callback for checking value.
 */

/**
 * @type {validateExpr[]}
 * @private
 * @description Object of different types of validation.
 */
export const validateCheckExpressions = {
  '>0': {
    check: (n) => n > 0,
    text: '$n argument must be positive!',
    error: RangeError
  },
  '>=0': {
    check: (n) => n >= 0,
    text: '$n argument must be non-negative!',
    error: RangeError
  },
  '<0': {
    check: (n) => n < 0,
    text: '$n argument must be negative!',
    error: RangeError
  },
  '<=0': {
    check: (n) => n <= 0,
    text: '$n argument must be non-positive!',
    error: RangeError
  },
  '!!': {
    check: (v) => !methods.isNil(v),
    text: '$n argument must be not null or undefined!',
    error: TypeError
  },
  array: {
    check: methods.isArray,
    text: '$n argument must be an array!',
    error: TypeError
  },
  'array||!': {
    check: (a) => methods.isArray(a) || methods.isNil(a),
    text: '$n argument must be an array, or undefined, or null!',
    error: TypeError
  },
  arrayLike: {
    check: methods.isArrayLike,
    text: '$n argument must be array-like!',
    error: TypeError
  },
  'arrayLike||!': {
    check: (a) => methods.isArrayLike(a) || methods.isNil(a),
    text: '$n argument must be array-like, or undefined, or null!',
    error: TypeError
  },
  date: {
    check: methods.isDate,
    text: '$n argument must be a date!',
    error: TypeError
  },
  'date||!': {
    check: (d) => methods.isDate(d) || methods.isNil(d),
    text: '$n argument must be a date, or undefined, or null!',
    error: TypeError
  },
  dateLike: {
    check: methods.isDateLike,
    text: '$n argument must be date-like!',
    error: TypeError
  },
  'dateLike||!': {
    check: (d) => methods.isDateLike(d) || methods.isNil(d),
    text: '$n argument must be date-like, or undefined, or null!',
    error: TypeError
  },
  function: {
    check: methods.isFunction,
    text: '$n argument must be a function!',
    error: TypeError
  },
  'function||!': {
    check: (f) => methods.isFunction(f) || methods.isNil(f),
    text: '$n argument must be a function, or undefined, or null!',
    error: TypeError
  },
  int: {
    check: methods.isInteger,
    text: '$n argument must be an integer!',
    error: TypeError
  },
  'int||!': {
    check: (i) => methods.isInteger(i) || methods.isNil(i),
    text: '$n argument must be an integer, or undefined, or null!',
    error: TypeError
  },
  intLike: {
    check: methods.isIntegerLike,
    text: '$n argument must be integer-like!',
    error: TypeError
  },
  'intLike||!': {
    check: (i) => methods.isIntegerLike(i) || methods.isNil(i),
    text: '$n argument must be integer-like, or undefined, or null!',
    error: TypeError
  },
  number: {
    check: methods.isNumber,
    text: '$n argument must be a number!',
    error: TypeError
  },
  'number||!': {
    check: (n) => methods.isNumber(n) || methods.isNil(n),
    text: '$n argument must be a number, or undefined, or null!',
    error: TypeError
  },
  numberLike: {
    check: methods.isNumberLike,
    text: '$n argument must be number-like!',
    error: TypeError
  },
  'numberLike||!': {
    check: (n) => methods.isNumberLike(n) || methods.isNil(n),
    text: '$n argument must be number-like, or undefined, or null!',
    error: TypeError
  },
  object: {
    check: methods.isObject,
    text: '$n argument must be an object!',
    error: TypeError
  },
  'object||!': {
    check: (o) => methods.isObject(o) || methods.isNil(o),
    text: '$n argument must be an object, or undefined, or null!',
    error: TypeError
  },
  regexp: {
    check: methods.isRegExp,
    text: '$n argument must be a regular expression!',
    error: TypeError
  },
  'regexp||!': {
    check: (r) => methods.isRegExp(r) || methods.isNil(r),
    text: '$n argument must be a regular expression, or undefined, or null!',
    error: TypeError
  },
  string: {
    check: methods.isString,
    text: '$n argument must be a string!',
    error: TypeError
  },
  'string||!': {
    check: (s) => methods.isString(s) || methods.isNil(s),
    text: '$n argument must be a string, or undefined, or null!',
    error: TypeError
  }
};