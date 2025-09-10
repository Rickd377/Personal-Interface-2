const searchBar = document.querySelector(".weather .search .searchbar");
const searchBarIcon = document.querySelector(".weather .search .fa-magnifying-glass");

searchBar.addEventListener("input", () => {
  if (searchBar.value.trim() === "") {
    searchBarIcon.className = "fa-sharp fa-solid fa-magnifying-glass";
  } else {
    searchBarIcon.className = "fa-sharp fa-solid fa-xmark";
  }
});

searchBarIcon.addEventListener("click", () => {
  if (searchBarIcon.classList.contains("fa-xmark")) {
    searchBar.value = "";
    searchBar.dispatchEvent(new Event("input"));
    searchBar.focus();
  }
});