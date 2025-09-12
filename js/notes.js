const notesTextarea = document.querySelector("#notes");
const notesContainer = document.querySelector(".notes");
let saveTimeout;

notesTextarea.value = localStorage.getItem("notes") || "";
updateNotesBorderColor();

function saveNotes() {
  localStorage.setItem("notes", notesTextarea.value);
  updateNotesBorderColor();
}

notesTextarea.addEventListener("input", () => {
  clearTimeout(saveTimeout);
  updateNotesBorderColor();
  saveTimeout = setTimeout(saveNotes, 3000);
});

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
    if (document.activeElement === notesTextarea) {
      e.preventDefault();
      clearTimeout(saveTimeout);
      saveNotes();
    }
  }
});

function updateNotesBorderColor() {
  const saved = localStorage.getItem("notes") || "";
  notesContainer.classList.toggle("saved", notesTextarea.value === saved);
  notesContainer.classList.toggle("unsaved", notesTextarea.value !== saved);
}

const themeObserver = new MutationObserver(() => {
  updateNotesBorderColor();
});
themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });