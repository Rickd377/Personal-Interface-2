(function () {
  const weekContainer = document.querySelector('.week');
  const currentWeekSpan = weekContainer.querySelector('.current-week');
  const dayDisplay = weekContainer.querySelector('.day-display');
  const dayDivs = dayDisplay.querySelectorAll('.day');
  const weekdateSpans = dayDisplay.querySelectorAll('.weekdate');
  const prevBtn = weekContainer.querySelector('#prevWeek');
  const nextBtn = weekContainer.querySelector('#nextWeek');

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
    const monday = getSunday(now);
    monday.setDate(monday.getDate() + offset * 7);
  
    const weekNum = getWeekNumber(monday);
    currentWeekSpan.textContent = `Week ${weekNum}`;
  
    dayDivs.forEach((dayDiv, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekdateSpans[i].textContent = date.getDate();
  
      dayDiv.classList.remove('active-day');
      if (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate() &&
        offset === 0
      ) {
        dayDiv.classList.add('active-day');
      }
    });
  
    prevBtn.style.opacity = (weekOffset <= -MAX_OFFSET) ? ".5" : "1";
    prevBtn.style.pointerEvents = (weekOffset <= -MAX_OFFSET) ? "none" : "auto";
    nextBtn.style.opacity = (weekOffset >= MAX_OFFSET) ? ".5" : "1";
    nextBtn.style.pointerEvents = (weekOffset >= MAX_OFFSET) ? "none" : "auto";
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