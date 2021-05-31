const addNote = document.getElementById('add')
const notesContainer = document.getElementById('notes-container')
addNote.disabled = false

const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) notes.forEach((note) => addNewNote(note))

addNote.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('notes')
  note.innerHTML = `
    <div class="tools">
      <button id="save" class="save">${text ? 'Edit' : 'Save'}</button>
      <button id="delete"><i class="fas fa-trash"></i></button>
    </div>
    <textarea placeholder="Write here your note...." ></textarea>
  `

  const btnSave = note.querySelector('.notes #save')
  const btnDelete = note.querySelector('.notes #delete')
  const textarea = note.querySelector('textarea')

  textarea.value = text
  textarea.innerHTML = text
  if (textarea.value !== '') {
    textarea.setAttribute('readonly', '')
    textarea.classList.add('disabled')
  }

  if (textarea.value.length === 0) addNote.disabled = true

  textarea.addEventListener('input', (e) => {
    const { value } = e.target
    textarea.innerHTML = value
    addToLocalStorage()
  })

  btnSave.addEventListener('click', noteText(btnSave, textarea))
  btnDelete.addEventListener('click', () => {
    note.remove()
    addToLocalStorage()
  })

  notesContainer.appendChild(note)
}

function noteText(save, textarea) {
  save.addEventListener('click', () => {
    if (textarea.value === '' || textarea.value === ' ') return
    if (save.textContent === 'Edit') {
      save.innerHTML = 'Save'
      textarea.classList.remove('disabled')
      textarea.removeAttribute('readonly')
      addNote.disabled = true
    } else {
      addNote.disabled = false
      save.innerHTML = 'Edit'
      textarea.classList.add('disabled')
      textarea.setAttribute('readonly', '')
    }
  })
}

function addToLocalStorage() {
  const notesText = document.querySelectorAll('textarea')
  const notes = []
  notesText.forEach((note) => notes.push(note.value))
  localStorage.setItem('notes', JSON.stringify(notes))
}
