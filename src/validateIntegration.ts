import { fvalidation, type DateFormat } from './validate'

declare global {
  interface HTMLInputElement {
    isEmpty: () => boolean
    hasSpaces: () => boolean
    hasFractionalValue: () => boolean
    isNumber: () => boolean
    isPositive: () => boolean
    isNegative: () => boolean
    isZero: () => boolean
    isInRange: (min: number, max: number) => boolean
    isInLengthRange: (min: number, max: number) => boolean
    isEmail: () => boolean
    isYearPositionedCorrectly: (dateFormat: DateFormat) => boolean
    isValidDate: (dateFormat: DateFormat, minYear?: number, maxYear?: number) => boolean
    isValidPassword: () => boolean
    isMatching: (confirmation: HTMLInputElement) => boolean
  }

  interface String {
    isEmpty: () => boolean
    hasSpaces: () => boolean
    hasFractionalValue: () => boolean
    isNumber: () => boolean
    isPositive: () => boolean
    isNegative: () => boolean
    isZero: () => boolean
    isInRange: (min: number, max: number) => boolean
    isInLengthRange: (min: number, max: number) => boolean
    isEmail: () => boolean
    isYearPositionedCorrectly: (dateFormat: DateFormat) => boolean
    isValidDate: (dateFormat: DateFormat, minYear?: number, maxYear?: number) => boolean
    isValidPassword: () => boolean
    isMatching: (confirmation: string) => boolean
  }

  interface Number {
    hasFractionalValue: () => boolean
    isPositive: () => boolean
    isNegative: () => boolean
    isZero: () => boolean
    isInRange: (min: number, max: number) => boolean
  }

  interface Array<T> {
    isEmpty: () => boolean
    areAllNumbers: () => boolean
    areAllPositives: () => boolean
    areAllNegatives: () => boolean
    areAllZeros: () => boolean
  }
}

const allowedTypesNumberMethods: string[] = ['number', 'text']
const allowedTypesStringMethods: string[] = ['text', 'search', 'password', 'email']
const currentYear = new Date().getFullYear()
const isTypeAllowed = (allowed: string[], toCheck: string): boolean => {
  if (allowed.find((type) => toCheck === type) === undefined) return false
  return true
}

/* IMPLEMENTATION OF METHODS FOR INPUTS */

HTMLInputElement.prototype.isEmpty = function () {
  const typesAllowed: string[] = ['number', 'text', 'search', 'password', 'email']
  if (!isTypeAllowed(typesAllowed, this.type)) return false
  return fvalidation.isEmpty(this.value)
}

HTMLInputElement.prototype.hasSpaces = function () {
  if (!isTypeAllowed(['text', 'search', 'password', 'email'], this.type)) return false
  return fvalidation.hasSpaces(this.value)
}

HTMLInputElement.prototype.hasFractionalValue = function () {
  if (!isTypeAllowed(allowedTypesNumberMethods, this.type)) return false
  return fvalidation.hasFractionalValue(this.value)
}

HTMLInputElement.prototype.isNumber = function () {
  if (!isTypeAllowed(allowedTypesNumberMethods, this.type)) return false
  return fvalidation.isNumber(this.value)
}

HTMLInputElement.prototype.isPositive = function () {
  if (!isTypeAllowed(allowedTypesNumberMethods, this.type)) return false
  return fvalidation.isPositive(this.value)
}

HTMLInputElement.prototype.isNegative = function () {
  if (!isTypeAllowed(allowedTypesNumberMethods, this.type)) return false
  return fvalidation.isNegative(this.value)
}

HTMLInputElement.prototype.isZero = function () {
  if (!isTypeAllowed(allowedTypesNumberMethods, this.type)) return false
  return fvalidation.isZero(this.value)
}

HTMLInputElement.prototype.isInRange = function (min, max) {
  if (!isTypeAllowed(allowedTypesNumberMethods, this.type)) return false
  return fvalidation.isInRange(this.value, min, max)
}

HTMLInputElement.prototype.isInLengthRange = function (min, max) {
  if (!isTypeAllowed(allowedTypesStringMethods, this.type)) return false
  return fvalidation.isInLengthRange(this.value, min, max)
}

HTMLInputElement.prototype.isEmail = function () {
  if (!isTypeAllowed(allowedTypesStringMethods, this.type)) return false
  return fvalidation.isEmail(this.value)
}

HTMLInputElement.prototype.isYearPositionedCorrectly = function (dateFormat = 'DD/MM/YYYY') {
  /* input date should always have date format, that's why is not in the allowed types */
  if (!isTypeAllowed(['text'], this.type)) return false
  return fvalidation.isYearPositionedCorrectly(this.value, dateFormat)
}

HTMLInputElement.prototype.isValidDate = function (
  dateFormat = 'DD/MM/YYYY',
  minYear = currentYear - 1,
  maxYear = currentYear
) {
  /* input date should always have a valid date, that's why is not in the allowed types */
  if (!isTypeAllowed(['text'], this.type)) return false
  return fvalidation.isValidDate(this.value, dateFormat, minYear, maxYear)
}

HTMLInputElement.prototype.isValidPassword = function () {
  if (!isTypeAllowed(['text', 'password'], this.type)) return false
  return fvalidation.isValidPassword(this.value)
}

HTMLInputElement.prototype.isMatching = function (confirmation) {
  return fvalidation.isMatching(this.value, confirmation.value)
}

/* IMPLEMENTATION OF METHODS FOR STRINGS */

String.prototype.isEmpty = function () {
  /* JSON parse and stringify is necessary since type 'String' is not assignable to type 'string' */
  return fvalidation.isEmpty(JSON.parse(JSON.stringify(this)))
}

String.prototype.hasSpaces = function () {
  return fvalidation.hasSpaces(JSON.parse(JSON.stringify(this)))
}

String.prototype.hasFractionalValue = function () {
  return fvalidation.hasFractionalValue(JSON.parse(JSON.stringify(this)))
}

String.prototype.isNumber = function () {
  return fvalidation.isNumber(JSON.parse(JSON.stringify(this)))
}

String.prototype.isPositive = function () {
  return fvalidation.isPositive(JSON.parse(JSON.stringify(this)))
}

String.prototype.isNegative = function () {
  return fvalidation.isNegative(JSON.parse(JSON.stringify(this)))
}

String.prototype.isZero = function () {
  return fvalidation.isZero(JSON.parse(JSON.stringify(this)))
}

String.prototype.isInRange = function (min, max) {
  return fvalidation.isInRange(JSON.parse(JSON.stringify(this)), min, max)
}

String.prototype.isInLengthRange = function (min, max) {
  return fvalidation.isInLengthRange(JSON.parse(JSON.stringify(this)), min, max)
}

String.prototype.isEmail = function () {
  return fvalidation.isEmail(JSON.parse(JSON.stringify(this)))
}

String.prototype.isYearPositionedCorrectly = function (dateFormat = 'DD/MM/YYYY') {
  return fvalidation.isYearPositionedCorrectly(JSON.parse(JSON.stringify(this)), dateFormat)
}

String.prototype.isValidDate = function (
  dateFormat = 'DD/MM/YYYY',
  minYear = currentYear - 1,
  maxYear = currentYear
) {
  return fvalidation.isValidDate(JSON.parse(JSON.stringify(this)), dateFormat, minYear, maxYear)
}

String.prototype.isValidPassword = function () {
  return fvalidation.isValidPassword(JSON.parse(JSON.stringify(this)))
}

String.prototype.isMatching = function (confirmation) {
  return fvalidation.isMatching(JSON.parse(JSON.stringify(this)), confirmation)
}

/* IMPLEMENTATION OF METHODS FOR NUMBERS */

Number.prototype.hasFractionalValue = function () {
  return fvalidation.hasFractionalValue(JSON.parse(JSON.stringify(this)))
}

Number.prototype.isPositive = function () {
  return fvalidation.isPositive(JSON.parse(JSON.stringify(this)))
}

Number.prototype.isNegative = function () {
  return fvalidation.isNegative(JSON.parse(JSON.stringify(this)))
}

Number.prototype.isZero = function () {
  return fvalidation.isZero(JSON.parse(JSON.stringify(this)))
}

Number.prototype.isInRange = function (min, max) {
  return fvalidation.isInRange(JSON.parse(JSON.stringify(this)), min, max)
}

/* IMPLEMENTATION OF METHODS FOR ARRAYS */

Array.prototype.isEmpty = function () {
  return fvalidation.isEmpty(this)
}

Array.prototype.areAllNumbers = function () {
  if (!fvalidation.isArrayOfTypes(this, ['number', 'string'])) return false
  return fvalidation.areAllNumbers(this)
}

Array.prototype.areAllPositives = function () {
  if (!fvalidation.isArrayOfTypes(this, ['number', 'string'])) return false
  return fvalidation.areAllPositives(this)
}

Array.prototype.areAllNegatives = function () {
  if (!fvalidation.isArrayOfTypes(this, ['number', 'string'])) return false
  return fvalidation.areAllNegatives(this)
}

Array.prototype.areAllZeros = function () {
  if (!fvalidation.isArrayOfTypes(this, ['number', 'string'])) return false
  return fvalidation.areAllZeros(this)
}
