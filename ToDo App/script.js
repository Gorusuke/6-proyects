const createToDo = document.getElementById('add')
const close = document.getElementById('close')
const modalContainer = document.getElementById('modal-container')
const appContainer = document.getElementById('app-container')
const inputText = document.getElementById('text')
const addToDoButton = document.getElementById('addToDoButton')
const toDoContainer = document.querySelector('.body')
const initialText = document.querySelector('.body p')
const numbersOfTaks = document.querySelector('.header h4')

const notes = getToLocalStorage()
notes.forEach((note) => addToDoList(note))

close.addEventListener('click', () => {
  modalContainer.style.display = 'none'
  appContainer.style.display = 'block'
})

createToDo.addEventListener('click', () => {
  modalContainer.style.display = 'flex'
  appContainer.style.display = 'none'
  inputText.value = ''
})

addToDoButton.addEventListener('click', () => {
  if (inputText.value.length === 0) return
  modalContainer.style.display = 'none'
  appContainer.style.display = 'block'
  addToDoList()
  addToLocalStorage()
})

function addToDoList(note) {
  let todoText = inputText.value
  if (note) todoText = note
  if (todoText) {
    const toDo = document.createElement('div')
    toDo.classList.add('task-container')
    toDo.innerHTML = `
      <li class='link'>${todoText}</li>
      <div class="buttons-container">
        <i id="button" class="far fa-circle"></i>
      </div>
    `
    const link = toDo.querySelector('div .link')
    const buttonsContainer = toDo.querySelector('.buttons-container')
    const buttonCheck = toDo.querySelector('div #button')

    buttonCheck.addEventListener('click', () =>
      changeButtonsStatus(link, buttonCheck, buttonsContainer, toDo)
    )
    numbersOfTaks.textContent = `${
      document.querySelectorAll('.link').length + 1
    } tasks`
    initialText.style.display = 'none'
    toDoContainer.appendChild(toDo)
  }
}

function changeButtonsStatus(link, button, buttonsContainer, toDoContainer) {
  if (button.getAttribute('class') === 'far fa-check-circle check') {
    button.setAttribute('class', 'far fa-circle')
    button.classList.remove('check')
    link.classList.remove('check')
    closeButton(buttonsContainer, button, toDoContainer, false)
  } else {
    button.setAttribute('class', 'far fa-check-circle')
    button.classList.add('check')
    link.classList.add('check')
    closeButton(buttonsContainer, button, toDoContainer, true)
  }
}

function closeButton(buttonsContainer, button, toDoContainer, boolean = false) {
  const i = document.createElement('i')
  i.className = 'far fa-times-circle close-button'
  i.addEventListener('click', () => {
    toDoContainer.remove()
    removeFromLocalStorage(i)
    numbersOfTaks.textContent = `${
      document.querySelectorAll('.link').length
    } tasks`
    if (numbersOfTaks.textContent === '0 tasks')
      initialText.style.display = 'block'
  })
  if (boolean) {
    buttonsContainer.appendChild(i)
  } else {
    buttonsContainer.innerHTML = ''
    buttonsContainer.appendChild(button)
  }
}

function addToLocalStorage() {
  const taskToDo = document.querySelectorAll('.link')
  const todos = []
  taskToDo.forEach((task) => todos.push(task.innerText))
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getToLocalStorage() {
  const todos = JSON.parse(localStorage.getItem('todos'))
  return todos === null ? [] : todos
}

function removeFromLocalStorage(element) {
  const parentsElements = element.parentElement.parentElement
  const li = parentsElements.querySelector('li').textContent
  const todos = getToLocalStorage()
  localStorage.setItem('todos', JSON.stringify(todos.filter((id) => id !== li)))
}
