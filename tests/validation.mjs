import '../fvalidation.js'

/* integration with datatypes is working (strings) */
const string = 'Hello'
console.log(string.isEmpty())

/* integration with datatypes is working (numbers) */
const numPositive = 200
console.log(numPositive.isPositive())
console.log(numPositive.isNegative())
console.log(numPositive.isZero())

const numNegative = -200
console.log(numNegative.isPositive())
console.log(numNegative.isNegative())
console.log(numNegative.isZero())

/* integration with datatypes is working (arrays) */

const arrayPositives = [20, 30, 50, 90]
console.log(arrayPositives.areAllPositives())
console.log(arrayPositives.areAllNegatives())

const arrayNegatives = [-20, -30, -50, -90]
console.log(arrayNegatives.areAllPositives())
console.log(arrayNegatives.areAllNegatives())

/* integration with form inputs is working */
const frmLogin = document.getElementById('frmLogin')
const { username, mail, userkey } = frmLogin

if (username.isEmpty()) console.error("Username can't be empty")
if (!mail.isEmail()) console.error('Email address format is not valid')
if (!userkey.isValidPassword()) console.error('Password is not valid')
