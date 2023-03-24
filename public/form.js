import './fvalidation.js'

const formUser = document.getElementById('formUser')
const { username } = formUser
/* so far it works with inputs */
console.log(username.isEmpty())
/* and it also works with data types such as: numbers, strings, and arrays */
const number = -250
console.log(number.isNegative())

// However if I try to import the fvalidation instance I get an error
// import { fvalidation } from './fvalidation.js';
