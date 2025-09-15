(function () {
  const weekContainer = document.querySelector('.week');
  const currentWeekSpan = weekContainer.querySelector('.current-week');
  const dayDisplay = weekContainer.querySelector('.day-display');
  const dayDivs = dayDisplay.querySelectorAll('.day');
  const weekdateSpans = dayDisplay.querySelectorAll('.weekdate');

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

  function setWeek(weekOffset = 0) {
    const today = new Date();
    const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const monday = getSunday(now);
    monday.setDate(monday.getDate() + weekOffset * 7);

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
        weekOffset === 0
      ) {
        dayDiv.classList.add('active-day');
      }
    });
  }

  function autoAdvanceWeek() {
    const today = new Date();
    if (today.getDay() === 6) {
      setWeek(1);
    } else {
      setWeek(0);
    }
  }

  autoAdvanceWeek();
})();