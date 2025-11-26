(function () {
  const weekContainer = document.querySelector('.week');
  const currentWeekSpan = weekContainer.querySelector('.current-week');
  const dayDisplay = weekContainer.querySelector('.day-display');
  const dayDivs = dayDisplay.querySelectorAll('.day');
  const weekdateSpans = dayDisplay.querySelectorAll('.weekdate');
  const prevBtn = weekContainer.querySelector('#prevWeek');
  const nextBtn = weekContainer.querySelector('#nextWeek');
  const notesTextarea = document.querySelector("#notes");

  let weekOffset = 0;
  const MAX_OFFSET = 4;

  function getSunday(d) {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  }

  function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  function setWeek(offset = 0) {
    const today = new Date();
    const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const sunday = getSunday(now);
    sunday.setDate(sunday.getDate() + offset * 7);
  
    const weekNum = getWeekNumber(sunday);
    currentWeekSpan.textContent = `Week ${weekNum}`;
  
    dayDivs.forEach((dayDiv, i) => {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      const dateKey = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
      ].join("-");

      weekdateSpans[i].textContent = date.getDate();
  
      dayDiv.classList.remove('active-day', 'editing-day');
      if (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate() &&
        offset === 0
      ) {
        dayDiv.classList.add('active-day');
      }
  
      const dayDot = dayDiv.querySelector(".day-dot");
      if (localStorage.getItem(`notes-${dateKey}`)) {
        if (!dayDot) {
          const newDot = document.createElement('div');
          newDot.classList.add("day-dot");
          dayDiv.appendChild(newDot);
        }
      } else if (dayDot) {
        dayDot.remove();
      }
  
      dayDiv.onclick = () => {
        const savedNotes = localStorage.getItem(`notes-${dateKey}`);
        const confirmMessage = savedNotes
          ? `Do you want to load the notes from ${dateKey}?`
          : `No notes found for ${dateKey}. Do you want to create new notes?`;
  
        if (confirm(confirmMessage)) {
          notesTextarea.value = savedNotes || "";
          localStorage.setItem("currentDate", dateKey);
  
          const event = new CustomEvent("currentDateChanged", { detail: { dateKey } });
          document.dispatchEvent(event);
  
          dayDivs.forEach(div => div.classList.remove('editing-day'));
          dayDiv.classList.add('editing-day');
        }
      };
    });
  
    prevBtn.style.opacity = (weekOffset <= -MAX_OFFSET) ? ".5" : "1";
    prevBtn.style.pointerEvents = (weekOffset <= -MAX_OFFSET) ? "none" : "auto";
    nextBtn.style.opacity = (weekOffset >= MAX_OFFSET) ? ".5" : "1";
    nextBtn.style.pointerEvents = (weekOffset >= MAX_OFFSET) ? "none" : "auto";
  
    cleanupExpiredNotes();
  }

  function cleanupExpiredNotes() {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - MAX_OFFSET * 7);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + MAX_OFFSET * 7);

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("notes-")) {
        const noteDate = new Date(key.split("-")[1]);
        if (noteDate < minDate || noteDate > maxDate) {
          localStorage.removeItem(key);
        }
      }
    });
  }

  setWeek(weekOffset);

  prevBtn.addEventListener('click', () => {
    if (weekOffset > -MAX_OFFSET) {
      weekOffset--;
      setWeek(weekOffset);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (weekOffset < MAX_OFFSET) {
      weekOffset++;
      setWeek(weekOffset);
    }
  });
})();