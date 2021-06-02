const addToDo = document.getElementById('add')
const close = document.getElementById('close')
const modalContainer = document.getElementById('modal-container')
const appContainer = document.getElementById('app-container')
const inputText = document.getElementById('text')
const addToDoButton = document.getElementById('addToDoButton')
const toDoContainer = document.querySelector('.body')

close.addEventListener('click', () => {
  modalContainer.style.display = 'none'
  appContainer.style.display = 'block'
})

addToDo.addEventListener('click', () => {
  modalContainer.style.display = 'flex'
  inputText.value = ''
})

addToDoButton.addEventListener('click', () => {
  modalContainer.style.display = 'none'
})

inputText.addEventListener('change', (e) => {
  const { value } = e.target
  if (value.length === 0) return
  addToDoList(value)
})

function addToDoList(inputValue) {
  const toDo = document.createElement('div')
  toDo.classList.add('task-container')
  toDo.innerHTML = `
    <li id="link">${inputValue}</li>
    <div id="buttons-container">
      <i id="button" class="far fa-circle"></i>
    </div>
  `
  const link = toDo.querySelector('div #link')
  const buttonsContainer = toDo.querySelector('#buttons-container')
  const buttonCheck = toDo.querySelector('div #button')
  // console.info(buttonsContainer)

  buttonCheck.addEventListener('click', () =>
    changeButtonsStatus(link, buttonCheck, buttonsContainer)
  )

  toDoContainer.appendChild(toDo)
}

function changeButtonsStatus(link, button, buttonsContainer) {
  if (button.getAttribute('class') === 'far fa-check-circle check') {
    button.setAttribute('class', 'far fa-circle')
    button.classList.remove('check')
    link.classList.remove('check')
    closeButton(buttonsContainer, button, false)
  } else {
    button.setAttribute('class', 'far fa-check-circle')
    button.classList.add('check')
    link.classList.add('check')
    closeButton(buttonsContainer, button, true)
  }
}

function closeButton(buttonsContainer, button, boolean = false) {
  // buttonsContainer.innerHTML = ''
  if (boolean) {
    const i = document.createElement('i')
    i.classList.add('far')
    i.classList.add('fa-times-circle')
    i.classList.add('close-button')
    buttonsContainer.appendChild(i)
    // console.info(button)
  } else {
    // buttonsContainer.innerHTML = 'hola'
    // console.info(button)
  }

  if (button.getAttribute('class') !== 'far fa-check-circle check') {
    button.setAttribute('class', 'far fa-circle')
  }
}
