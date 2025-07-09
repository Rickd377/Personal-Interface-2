const notesTextarea = document.querySelector("#notes");
const notesContainer = document.querySelector(".notes-container");
let saveTimeout;

notesTextarea.value = localStorage.getItem("notes") || "";

function saveNotes() {
  localStorage.setItem("notes", notesTextarea.value);
  updateNotesBorderColor();
}

notesTextarea.addEventListener("input", () => {
  clearTimeout(saveTimeout);
  updateNotesBorderColor();
  saveTimeout = setTimeout(saveNotes, 3000);
});

notesTextarea.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
    e.preventDefault();
    clearTimeout(saveTimeout);
    saveNotes();
  }
});

function updateNotesBorderColor() {
  const saved = localStorage.getItem("notes") || "";
  notesContainer.classList.toggle("saved", notesTextarea.value === saved);
  notesContainer.classList.toggle("unsaved", notesTextarea.value !== saved);
}

const themeObserver = new MutationObserver(() => {
  if (notesContainer.classList.contains("open")) {
    updateNotesBorderColor();
  }
})
themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });

document.querySelector(".notes-btn").addEventListener("click", () => {
  notesContainer.classList.toggle("open");
  if (notesContainer.classList.contains("open")) {
    updateNotesBorderColor();
  }
});