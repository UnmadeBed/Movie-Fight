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
input.addEventListener('input', (event) => {
  fetchData(event.target.value);
})