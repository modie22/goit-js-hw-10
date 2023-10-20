import axios from 'axios';
import Notiflix from 'notiflix';
import {  removeclassLoader,addErrorText } from '.';
axios.defaults.headers.common['x-api-key'] =
  'live_x7TzLieqSraRDcaXJZCGsY2HLqPJH8gA7h6PxDfaSzNzyFEl1j3kzSAtCxSHsLZF';
function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
    removeclassLoader();
    addErrorText();
      throw error;
    });
}
function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      removeclassLoader();
      addErrorText();
      throw error;
    });
}
export { fetchBreeds, fetchCatByBreed };
