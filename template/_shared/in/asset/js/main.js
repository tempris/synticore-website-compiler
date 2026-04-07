(function () {
  // Starter script hook: replace with site-specific behaviors.
  document.documentElement.classList.add("js");

  var currentYearNodes = document.querySelectorAll("[data-current-year]");
  if (!currentYearNodes.length) return;

  var year = String(new Date().getFullYear());
  for (var i = 0; i < currentYearNodes.length; i++) {
    currentYearNodes[i].textContent = year;
  }
})();
