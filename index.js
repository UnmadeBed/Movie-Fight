const mykey = config.MY_KEY;
const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com', {
    params: {
      apikey: mykey,
      s: searchTerm
    }
  });

  console.log(response.data);
};

const input = document.querySelector('input');
// This is called 'debouncing an iput'. This means we wait for some time to pass
// the last event to actually do something.

// Debounce function
const debounce = (func, delay = 1000) => {
  let timeOutId;
  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay)
  };
};
 

const onInput = event => {
  fetchData(event.target.value)
};

input.addEventListener('input', debounce(onInput, 500));