const password = document.getElementById('password')
const copy = document.getElementById('copy')
const length = document.getElementById('length')
const upper = document.getElementById('upper')
const lower = document.getElementById('lower')
const number = document.getElementById('number')
const symbol = document.getElementById('symbol')
const generate = document.getElementById('generate')
const messageContainer = document.querySelector('.message-container')

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const symbols = '!"#$%&/()=?¡°|@,-.{}+*~'

function getLowerCase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)]
}

function getUpperCase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)]
}

function getNumbers() {
  return numbers[Math.floor(Math.random() * numbers.length)]
}

function getSymbols() {
  return symbols[Math.floor(Math.random() * symbols.length)]
}

function messageError() {
  const message = document.createElement('div')
  message.classList.add('message')
  message.innerHTML = 'You need to check at least one option'
  messageContainer.appendChild(message)

  setTimeout(() => {
    message.remove()
  }, 2000)
}

function generatePassword() {
  if (!upper.checked && !lower.checked && !number.checked && !symbol.checked) {
    messageError()
    password.innerText = ''
    return
  }

  let len
  if (length.value > 25) len = 25
  else if (length.value < 10) len = 10
  else len = length.value

  let newPassword = ''
  if (upper.checked) newPassword += getUpperCase()
  if (lower.checked) newPassword += getLowerCase()
  if (number.checked) newPassword += getNumbers()
  if (symbol.checked) newPassword += getSymbols()
  for (let i = newPassword.length; i < len; i++) {
    const gen = generateX()
    newPassword += gen
  }
  password.innerText = newPassword
}

function generateX() {
  const password = []
  if (upper.checked) password.push(getUpperCase())
  if (lower.checked) password.push(getLowerCase())
  if (number.checked) password.push(getNumbers())
  if (symbol.checked) password.push(getSymbols())
  return password[Math.floor(Math.random() * password.length)]
}

generate.addEventListener('click', generatePassword)

copy.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const copyText = password.innerText
  if (!copyText) return
  textarea.value = copyText
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert('Password copied to clipboard')
})
