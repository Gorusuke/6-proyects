const save = document.getElementById("save");

const saveContent = "Save";
const editContent = "Edit";
save.innerHTML = saveContent;

save.addEventListener("click", () => {
  save.textContent === "Edit"
    ? (save.innerHTML = saveContent)
    : (save.innerHTML = editContent);
  // if (save.textContent === "Edit") {
  //   save.innerHTML = saveContent;
  // } else {
  //   save.innerHTML = editContent;
  // }
});
