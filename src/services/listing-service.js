
function executeApi(url) {
   return fetch(url)
  .then(response => {
    return response.json();
  });
}

export default executeApi;