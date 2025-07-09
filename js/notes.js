const notesTextarea = document.querySelector("#notes");
const notesContainer = document.querySelector(".notes-container");
let saveTimeout;

notesTextarea.value = localStorage.getItem("notes") || "";

function saveNotes() {
  localStorage.setItem("notes", notesTextarea.value);
  notesContainer.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border');
}

notesTextarea.addEventListener("input", () => {
  clearTimeout(saveTimeout);
  notesContainer.style.borderColor = "";
  saveTimeout = setTimeout(saveNotes, 3000);
});

notesTextarea.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
    e.preventDefault();
    clearTimeout();
    saveNotes();
  }
});

document.querySelector(".notes-btn").addEventListener("click", () => {
  notesContainer.classList.toggle("open");
  if (notesContainer.classList.contains("open")) {
    const saved = localStorage.getItem("notes") || "";
    if (notesTextarea.value === saved) {
      notesContainer.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue("--border");
    } else {
      notesContainer.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue("--text");
    }
  }
});