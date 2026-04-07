(function () {
  // App shell starter hooks (route marker + simple interactive placeholders).
  document.documentElement.classList.add("js");

  var path = (window.location.pathname || "/").toLowerCase();
  var routeKey = "home";
  if (path.indexOf("/dashboard") !== -1) routeKey = "dashboard";
  if (path.indexOf("/settings") !== -1) routeKey = "settings";

  var routeLinks = document.querySelectorAll("[data-route-link]");
  for (var r = 0; r < routeLinks.length; r++) {
    var key = (routeLinks[r].getAttribute("data-route-link") || "").toLowerCase();
    if (key === routeKey) routeLinks[r].classList.add("is-active");
  }

  var currentYearNodes = document.querySelectorAll("[data-current-year]");
  var year = String(new Date().getFullYear());
  for (var i = 0; i < currentYearNodes.length; i++) {
    currentYearNodes[i].textContent = year;
  }

  var forms = document.querySelectorAll(".app-form, .landing-form");
  for (var f = 0; f < forms.length; f++) {
    forms[f].addEventListener("submit", function (event) {
      event.preventDefault();
      window.alert("Starter form placeholder. Connect this form to your backend or API.");
    });
  }
})();
