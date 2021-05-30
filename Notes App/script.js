const notesContaioner = document.getElementById("notes");
const save = document.getElementById("save");
const deleteNote = document.getElementById("delete");
const textarea = document.getElementById("text");

const saveContent = "Save";
const editContent = "Edit";
save.innerHTML = saveContent;
// console.info();

save.addEventListener("click", () => {
  if (save.textContent === "Edit") {
    save.innerHTML = saveContent;
    textarea.removeAttribute("readonly");
    textarea.classList.remove("desibled");
    editToLocalStorage(textarea.value);
  } else {
    save.innerHTML = editContent;
    textarea.classList.add("desibled");
    // console.info(textarea.value);
    addToLocalStorage(textarea.value);
    textarea.setAttribute("readonly", "");
  }
});

function addToLocalStorage(note) {
  const notes = getToLocalStorage();
  localStorage.setItem("notes", JSON.stringify([...notes, note]));
}

function removeFromLocalStorage(textNote) {
  const notes = getToLocalStorage();
  localStorage.setItem(
    "notes",
    JSON.stringify(notes.filter((text) => text !== textNote))
  );
}

function editToLocalStorage(textNote) {
  const notes = getToLocalStorage();
  localStorage.setItem(
    "notes",
    JSON.stringify(notes.filter((text) => text !== textNote))
  );
}

function getToLocalStorage() {
  const notes = JSON.parse(localStorage.getItem("notes"));
  return notes === null ? [] : notes;
}

deleteNote.addEventListener("click", () => {
  removeFromLocalStorage(textarea.value);
  notesContaioner.classList.add("disabled");
});
