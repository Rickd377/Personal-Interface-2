(function () {
  const streakNum = document.querySelector('.streak-num');
  if (!streakNum) return;

  const STREAK_KEY = 'streak';
  const LAST_VISIT_KEY = "lastVisit";

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let streak = Number(localStorage.getItem(STREAK_KEY)) || 0;
  let lastVisit = localStorage.getItem(LAST_VISIT_KEY);

  if (lastVisit) {
    lastVisit = new Date(lastVisit);
    const diffDays = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays > 1) {
      streak = 1;
    }
  } else {
    streak = 1;
  }

  streakNum.textContent = streak;
  localStorage.setItem(STREAK_KEY, streak);
  localStorage.setItem(LAST_VISIT_KEY, today.toISOString());
})();