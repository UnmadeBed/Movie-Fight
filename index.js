// fetchData function which makes network requests to API
const mykey = config.MY_KEY;
const fetchData = async (searchTerm) => {
	const response = await axios.get("http://www.omdbapi.com", {
		params: {
			apikey: mykey,
			s: searchTerm,
		},
	});

	if (response.data.Error) {
		return [];
	}

	return response.data.Search;
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async (event) => {
	const movies = await fetchData(event.target.value);

	if (!movies.length) {
		dropdown.classList.remove("is-active");
	}

	resultsWrapper.innerHTML = "";
	dropdown.classList.add("is-active");
	for (let movie of movies) {
		const option = document.createElement("a");
		const imageSrc = movie.Poster === "N/A" ? "" : movie.Poster;

		option.classList.add("dropdown-item");
		option.innerHTML = `
      <img src="${imageSrc}"/>
      ${movie.Title}
    `;
		option.addEventListener("click", () => {
			dropdown.classList.remove("is-active");
			input.value = movie.Title;
			onMovieSelect(movie);
		});

		resultsWrapper.appendChild(option);
	}
};
input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", (event) => {
	if (!root.contains(event.target.target)) {
		dropdown.classList.remove("is-active");
	}
});

const onMovieSelect = async (movie) => {
	const response = await axios.get("http://www.omdbapi.com", {
		params: {
			apikey: mykey,
			i: movie.imdbID,
		},
	});

	console.log(response.data);
};
