/*
emailRegexSource: https://www.w3resource.com/javascript/form/email-validation.php
dateRegexSource: https://uibakery.io/regex-library/date
*/

export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD' | 'YYYY/DD/MM'
export type DateField = 'DD' | 'MM' | 'YYYY'
type TypesComparison = 'undefined' | 'object' | 'boolean' | 'number' | 'string' | 'function' | 'symbol' | 'bigint'
interface errors {
  date: {
    yearIsNotPositionedWhereItShould: string
    dayIsLessThanZero: string
    monthIsLessThanZero: string
    yearIsNotInRange: string
    monthIsGreaterThanPermitted: string
    dayIsGreaterThanPossible: string
  }
  password: {
    lengthIsLowerThanPermitted: string
    lengthIsGreaterThanPermitted: string
    capitalLettersAmountIsLessThanPermitted: string
    lowerLettersAmountIsLessThanPermitted: string
    symbolsAmountIsLessThanPermitted: string
  }
}

class FormValidation {
  emailRegex: RegExp
  dateRegex: RegExp
  dateRegexYearFirst: RegExp
  symbolsRegex: RegExp

  currentYear: number
  /* for password validation */
  minPwdLenght: number
  maxPwdLength: number
  minAmountLowerLetters: number
  minAmountCapitalLetters: number
  minAmountNumbers: number
  minAmountSymbols: number

  errorCodes: errors
  error: string

  constructor () {
    this.emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    this.dateRegex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/
    this.dateRegexYearFirst = /^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/
    this.symbolsRegex = /[^!@#$%^&*)(+=.<>{}[]:;'"|~`_-\/\\]/g

    this.currentYear = new Date().getFullYear()
    /* password validation default values */
    this.minPwdLenght = 15
    this.maxPwdLength = Infinity
    this.minAmountLowerLetters = 5
    this.minAmountCapitalLetters = 5
    this.minAmountNumbers = 3
    this.minAmountSymbols = 2

    this.errorCodes = {
      date: {
        yearIsNotPositionedWhereItShould: 'date/yearIsNotPositionedWhereItShould',
        dayIsLessThanZero: 'date/dayIsLessThanZero',
        monthIsLessThanZero: 'date/monthIsLessThanZero',
        yearIsNotInRange: 'date/yearIsNotInRange',
        monthIsGreaterThanPermitted: 'date/monthIsGreaterThanPermitted',
        dayIsGreaterThanPossible: 'date/dayIsGreaterThanPossible'
      },
      password: {
        lengthIsLowerThanPermitted: 'password/lengthIsLowerThanPermitted',
        lengthIsGreaterThanPermitted: 'password/lengthIsGreaterThanPermitted',
        capitalLettersAmountIsLessThanPermitted: 'password/capitalLettersAmountIsLessThanPermitted',
        lowerLettersAmountIsLessThanPermitted: 'password/lowerLettersAmountIsLessThanPermitted',
        symbolsAmountIsLessThanPermitted: 'password/symbolsAmountIsLessThanPermitted'
      }
    }
    this.error = ''
  }

  changePasswordValidation (
    minPwdLenght: number = 15,
    maxPwdLenght: number = Infinity,
    minAmountLowerLetters: number = 5,
    minAmountCapitalLetters: number = 5,
    minAmountNumbers: number = 3,
    minAmountSymbols: number = 2
  ): void {
    /* cover cases where password validation parameters are incorrect */
    const totalChars =
      minAmountLowerLetters + minAmountCapitalLetters + minAmountNumbers + minAmountSymbols
    if (totalChars > minPwdLenght) {
      console.error('password/totalRequirementsIsGreaterThanMinLength')
      return
    }
    if (maxPwdLenght < minPwdLenght) {
      console.error('password/minLengthIsGreaterThanMaxLength')
      return
    }

    /* set new values */
    this.minPwdLenght = minPwdLenght
    this.maxPwdLength = maxPwdLenght
    this.minAmountLowerLetters = minAmountLowerLetters
    this.minAmountCapitalLetters = minAmountCapitalLetters
    this.minAmountNumbers = minAmountNumbers
    this.minAmountSymbols = minAmountSymbols
  }

  // all elements from the array should be of the specified type
  isArrayOfType (array: any[], type: TypesComparison): boolean {
    if (!Array.isArray(array)) return false
    return array.every((value) => (typeof value === type))
  }

  // all elements from the array should be from one of the specified types
  isArrayOfTypes (array: any[], types: TypesComparison[]): boolean {
    if (!Array.isArray(array)) return false
    return array.every((value) => types.some((type) => (typeof value === type)))
  }

  isEmpty (value: string | any[]): boolean {
    return (value.length === 0)
  }

  hasSpaces (value: string): boolean {
    return value.trim().includes(' ')
  }

  hasFractionalValue (value: string | number): boolean {
    if (!this.isNumber(value)) return false
    return (!(parseInt(value.toString(), 10) === Number(value)))
  }

  isNumber (value: string | number): boolean {
    if (this.isEmpty(value.toString())) return false
    return !(isNaN(Number(value)))
  }

  areAllNumbers (values: Array<string | number>): boolean {
    for (const value of values) if (!this.isNumber(value)) return false
    return true
  }

  /*
  IMPORTANT:
  0 is not considered positive nor negative
  */
  isPositive (value: string | number): boolean {
    if (!this.isNumber(value)) return false
    return (Number(value) > 0)
  }

  areAllPositives (values: Array<string | number>): boolean {
    return values.every((value) => this.isPositive(value))
  }

  isNegative (value: string | number): boolean {
    if (!this.isNumber(value)) return false
    return (Number(value) < 0)
  }

  areAllNegatives (values: Array<string | number>): boolean {
    return values.every((value) => this.isNegative(value))
  }

  isZero (value: string | number): boolean {
    if (!this.isNumber(value)) return false
    return (Number(value) === 0)
  }

  areAllZeros (values: Array<string | number>): boolean {
    return values.every((value) => this.isZero(value))
  }

  isInRange (value: number | string, min: number, max: number): boolean {
    if (!this.isNumber(value)) return false
    return (!(Number(value) > max || Number(value) < min))
  }

  isInLengthRange (value: string, min: number, max: number): boolean {
    return (!(value.length > max || value.length < min))
  }

  isEmail (email: string): boolean {
    return this.emailRegex.test(email.trim())
  }

  getFieldIndexFromDate (dateFormat: DateFormat, toFind: DateField): number {
    const fields = dateFormat.split('/')
    /* returns -1 if field does not exist in date format */
    return fields.indexOf(fields.find((field) => field === toFind) ?? '')
  }

  isYearPositionedCorrectly (date: string, dateFormat: DateFormat = 'DD/MM/YYYY'): boolean {
    const yearIndex = this.getFieldIndexFromDate(dateFormat, 'YYYY')
    const regex = (yearIndex === 0) ? this.dateRegexYearFirst : this.dateRegex
    /* checks if year is positioned where it should */
    if (!regex.test(date.trim())) {
      this.error = this.errorCodes.date.yearIsNotPositionedWhereItShould
      return false
    }
    return true
  }

  isValidDate (
    date: string,
    dateFormat: DateFormat = 'DD/MM/YYYY',
    minYear: number = this.currentYear - 1,
    maxYear: number = this.currentYear
  ): boolean {
    if (!this.isYearPositionedCorrectly(date, dateFormat)) return false
    const fields = date.split('/')
    const dayNum = Number(fields[this.getFieldIndexFromDate(dateFormat, 'DD')])
    const monthNum = Number(fields[this.getFieldIndexFromDate(dateFormat, 'MM')])
    const yearNum = Number(fields[this.getFieldIndexFromDate(dateFormat, 'YYYY')])

    if (dayNum < 1) {
      this.error = this.errorCodes.date.dayIsLessThanZero
      return false
    }
    if (monthNum < 1) {
      this.error = this.errorCodes.date.monthIsLessThanZero
      return false
    }
    if (yearNum < minYear || yearNum > maxYear) {
      this.error = this.errorCodes.date.yearIsNotInRange
      return false
    }
    if (monthNum > 12) {
      this.error = this.errorCodes.date.monthIsGreaterThanPermitted
      return false
    }
    const isLeapYear = (yearNum % 4 === 0)
    switch (monthNum) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        if (dayNum > 31) {
          this.error = this.errorCodes.date.dayIsGreaterThanPossible
          return false
        }
        this.error = ''
        return true
      case 4:
      case 6:
      case 9:
      case 11:
        if (dayNum > 30) {
          this.error = this.errorCodes.date.dayIsGreaterThanPossible
          return false
        }
        this.error = ''
        return true
      case 2:
        if (!isLeapYear && dayNum > 28) {
          this.error = this.errorCodes.date.dayIsGreaterThanPossible
          return false
        }
        if (isLeapYear && dayNum > 29) {
          this.error = this.errorCodes.date.dayIsGreaterThanPossible
          return false
        }
        this.error = ''
        return true
    }
    this.error = ''
    return true
  }

  isValidPassword (password: string): boolean {
    if (password.length < this.minPwdLenght) {
      this.error = this.errorCodes.password.lengthIsLowerThanPermitted
      return false
    }
    if (password.length > this.maxPwdLength) {
      this.error = this.errorCodes.password.lengthIsGreaterThanPermitted
      return false
    }

    const capitalCount = password.replace(/[^A-Z]/g, '').length
    if (this.minAmountCapitalLetters > capitalCount) {
      this.error = this.errorCodes.password.capitalLettersAmountIsLessThanPermitted
      return false
    }

    const lowerCount = password.replace(/[^a-z]/g, '').length
    if (this.minAmountLowerLetters > lowerCount) {
      this.error = this.errorCodes.password.lowerLettersAmountIsLessThanPermitted
      return false
    }

    const symbolsCount = password.replace(this.symbolsRegex, '').length
    if (this.minAmountSymbols > symbolsCount) {
      this.error = this.errorCodes.password.symbolsAmountIsLessThanPermitted
      return false
    }

    this.error = ''
    return true
  }

  isMatching (password: string, confirmation: string): boolean {
    return (!(password.match(confirmation) === null))
  }
}

const fvalidation = new FormValidation()
export { fvalidation }
