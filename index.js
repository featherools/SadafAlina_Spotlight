document.addEventListener("DOMContentLoaded", function () {
	const searchButton = document.getElementById("search-btn");
	const keywordInput = document.getElementById("keyword");
	const quoteContainer = document.getElementById("quote-container");

	searchButton.addEventListener("click", async function () {
		console.log("Search button clicked");
		const keyword = keywordInput.value.trim();
		quoteContainer.innerHTML = ""; // Clear previous results

		if (!keyword) {
			console.log("No keyword entered");
			quoteContainer.innerHTML = "<p>Please enter a keyword to search.</p>";
			return;
		}

		console.log("Searching for keyword:", keyword); // Debug log

		try {
			const response = await fetch(
				`https://api.quotable.io/quotes?query=${encodeURIComponent(keyword)}`
			);

			console.log("API Response:", response); // Debug log

			if (!response.ok) {
				console.log("API returned an error");
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			console.log("API Data:", data); // Debug log

			if (data.results.length > 0) {
				console.log("Found quotes");
				data.results.forEach((quote) => {
					const quoteElement = document.createElement("div");
					quoteElement.classList.add("quote-item");
					quoteElement.innerHTML = `
                        <h3>"${quote.content}"</h3>
                        <p><strong>Author:</strong> ${quote.author}</p>
                        <p><strong>Tags:</strong> ${quote.tags.join(", ")}</p>
                    `;
					quoteContainer.appendChild(quoteElement);
				});
			} else {
				console.log("No quotes found");
				quoteContainer.innerHTML =
					"<p>No quotes found for the given keyword.</p>";
			}
		} catch (error) {
			console.log("Error occurred");
			quoteContainer.innerHTML =
				"<p>Sorry, something went wrong. Please try again later.</p>";
			console.error("Error fetching quotes:", error);
		}
	});

	// Allow pressing Enter to trigger search
	keywordInput.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			searchButton.click();
		}
	});
});
