import axios from 'axios';

axios.defaults.headers.common["x-api-key"] = 'live_9nNwSX38gdKs8yxGqnc6nVmI9TeDcnC2f3kb9CQLNFWRoA8x0sBAtXFjnsKc3aTR';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}