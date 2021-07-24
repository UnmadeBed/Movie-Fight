const mykey = config.MY_KEY;
const fetchData = async () => {
  const response = await axios.get('http://www.omdbapi.com', {
    params: {
      apikey: mykey,
      s: 'avengers'
    }
  });

  console.log(response.data);
}

fetchData();