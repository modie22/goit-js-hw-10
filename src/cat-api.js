import axios from 'axios';
import Notiflix from 'notiflix';
import {  removeclassLoader } from '.';
axios.defaults.headers.common['x-api-key'] =
  'live_x7TzLieqSraRDcaXJZCGsY2HLqPJH8gA7h6PxDfaSzNzyFEl1j3kzSAtCxSHsLZF';
function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if(!(response.status===200)){
        Notiflix.Report.failure("Сталась помилка","Обновіть сторінку");
        removeclassLoader();
        throw new Error();
      } 
      return response.data;
    })
    .catch(error => {
      Notiflix.Report.failure(`Error: ${error.response.status}`,error.message);
    removeclassLoader();
      throw error;
    });
}
function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
       if(!(response.status===200)){
        Notiflix.Report.failure("Сталась помилка","Обновіть сторінку");
        removeclassLoader();
        throw new Error();
      } 
      if(response.data[0]===undefined){
        Notiflix.Report.failure("Не знайшли такого кота","Виберіть іншого кота");
        removeclassLoader();
        throw new Error(response);
       } 
     return response.data;
    })
    .catch(error => {
      Notiflix.Report.failure(`Error: ${error.response.status}`,error.message);
      removeclassLoader();
      throw error;
    });
}
export { fetchBreeds, fetchCatByBreed };
