const notesTextarea = document.querySelector("#notes");
const notesContainer = document.querySelector(".notes");
let saveTimeout;

function getLocalDateKey(date = new Date()) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

const currentDateKey = localStorage.getItem("currentDate") || getLocalDateKey();
notesTextarea.value = localStorage.getItem(`notes-${currentDateKey}`) || "";
updateNotesPlaceholder(currentDateKey);
updateNotesBorderColor();

function saveNotes() {
  const dateKey = localStorage.getItem('currentDate') || getLocalDateKey();
  localStorage.setItem(`notes-${dateKey}`, notesTextarea.value);
  updateNotesBorderColor();
}

notesTextarea.addEventListener("input", () => {
  clearTimeout(saveTimeout);
  updateNotesBorderColor();
  saveTimeout = setTimeout(saveNotes, 2000);
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
  const dateKey = localStorage.getItem('currentDate') || new Date().toISOString().split('T')[0];
  const saved = localStorage.getItem(`notes-${dateKey}`) || "";
  notesContainer.classList.toggle("saved", notesTextarea.value === saved);
  notesContainer.classList.toggle("unsaved", notesTextarea.value !== saved);
}

function updateNotesPlaceholder(dateKey) {
  const todayKey = getLocalDateKey();
  if (dateKey === todayKey) {
    notesTextarea.placeholder = "Write your notes for today...";
  } else {
    notesTextarea.placeholder = `Write your notes for ${dateKey}...`;
  }
}

const themeObserver = new MutationObserver(() => {
  updateNotesBorderColor();
});

themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });

document.addEventListener("currentDateChanged", (e) => {
  const newDateKey = e.detail.dateKey;
  notesTextarea.value = localStorage.getItem(`notes-${newDateKey}`) || "";
  updateNotesPlaceholder(newDateKey);
  updateNotesBorderColor();
});