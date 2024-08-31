document.addEventListener("DOMContentLoaded", function () {
	console.log("Welcome to Sadaf Alina's Poetry Page!");

	const themeToggle = document.getElementById("theme-toggle");
	const body = document.body;
	const header = document.querySelector("header");
	const sections = document.querySelectorAll("section");
	const footer = document.querySelector("footer");

	// Load saved theme preference
	if (localStorage.getItem("theme") === "dark") {
		body.classList.add("dark-mode");
		header.classList.add("dark-mode");
		footer.classList.add("dark-mode");
		sections.forEach((section) => section.classList.add("dark-mode"));
		themeToggle.textContent = "Switch to Light Mode";
	}

	themeToggle.addEventListener("click", function () {
		body.classList.toggle("dark-mode");
		header.classList.toggle("dark-mode");
		footer.classList.toggle("dark-mode");
		sections.forEach((section) => section.classList.toggle("dark-mode"));

		if (body.classList.contains("dark-mode")) {
			themeToggle.textContent = "Switch to Light Mode";
			localStorage.setItem("theme", "dark");
		} else {
			themeToggle.textContent = "Switch to Dark Mode";
			localStorage.setItem("theme", "light");
		}
	});
});
