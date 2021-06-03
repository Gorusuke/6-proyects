const createToDo = document.getElementById('add')
const close = document.getElementById('close')
const modalContainer = document.getElementById('modal-container')
const appContainer = document.getElementById('app-container')
const inputText = document.getElementById('text')
const addToDoButton = document.getElementById('addToDoButton')
const toDoContainer = document.querySelector('.body')
const initialText = document.querySelector('.body p')
const numbersOfTaks = document.querySelector('.header h4')
// console.info(numbersOfTaks)

const notes = localStorage.getItem('todos')
// console.info(notes)

// if (notes) {
//   notes.forEach((note) => console.info(note))
// }

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
  appContainer.style.display = 'block'
  initialText.remove()
  addToDoList(inputText.value)
  modalContainer.style.display = 'none'
})

function addToDoList(inputValue) {
  const toDo = document.createElement('div')
  toDo.classList.add('task-container')
  toDo.innerHTML = `
    <li id="link">${inputValue}</li>
    <div class="buttons-container">
      <i id="button" class="far fa-circle"></i>
    </div>
  `
  const link = toDo.querySelector('div #link')
  const buttonsContainer = toDo.querySelector('.buttons-container')
  const buttonCheck = toDo.querySelector('div #button')
  // console.info(buttonsContainer)

  buttonCheck.addEventListener('click', () =>
    changeButtonsStatus(link, buttonCheck, buttonsContainer, toDo)
  )

  // console.info(notes.length)
  // if (todos) numbersOfTaks.innerHTML = `${notes.length} tasks`

  // console.info(toDo)
  // addToLocalStorage(toDo)
  addToLocalStorage()
  toDoContainer.appendChild(toDo)
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
    // addToLocalStorage()
    closeButton(buttonsContainer, button, toDoContainer, true)
  }
}

function closeButton(buttonsContainer, button, toDoContainer, boolean = false) {
  const i = document.createElement('i')
  i.classList.add('far')
  i.classList.add('fa-times-circle')
  i.classList.add('close-button')
  i.addEventListener('click', () => toDoContainer.remove())
  if (boolean) {
    buttonsContainer.appendChild(i)
  } else {
    buttonsContainer.innerHTML = ''
    buttonsContainer.appendChild(button)
  }
}

function addToLocalStorage() {
  const taskToDo = document.querySelectorAll('li')
  console.info(taskToDo)
  // const todos = []
  // taskToDo.forEach((task) => todos.push(task.innerText))
  // console.info(todos)
  // localStorage.setItem('todos', JSON.stringify(todos))
  // const toDoTasks = document.querySelectorAll('li')
  // const toDo = []
  // toDoTasks.forEach((task) => toDo.push(task))
  // localStorage.setItem('tasks', JSON.stringify(toDo))
}
