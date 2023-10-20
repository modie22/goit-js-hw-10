import axios from 'axios';
import Notiflix from 'notiflix';
axios.defaults.headers.common['x-api-key'] =
  'live_x7TzLieqSraRDcaXJZCGsY2HLqPJH8gA7h6PxDfaSzNzyFEl1j3kzSAtCxSHsLZF';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
const elements = {
  blockEl: document.querySelector('.block'),
  loaderApi: document.querySelector('.loader'),
  errorApi: document.querySelector('.error'),
  blockCat: document.querySelector('.cat-info'),
};

createSelectedCat();
function selecCat(e) {
    addclassLoader();
  removeErrorText();
  elements.blockCat.innerHTML = '';
  fetchCatByBreed(e.currentTarget.value).then(cat => {
    elements.blockCat.innerHTML = `<img src="${cat[0].url}" alt="123">
   <div class="text-info">
   <h1>${cat[0].breeds[0].name}</h1>
   <p>${cat[0].breeds[0].description}</p>
   <p><b><span>Temperament:  </span></b>${cat[0].breeds[0].temperament}</p>
   </div>
   `;
    removeclassLoader();
  });
}

function createSelectedCat() {
  fetchBreeds().then(cats => {
    console.log(cats);
    const optionEl = cats
      .map(({ name, id }) => {
        return `
    <option value="${id}">
    ${name}
    </option>
    `;
      })
      .join();
    elements.blockEl.insertAdjacentHTML(
      'afterbegin',
      `<select class="breed-select">${optionEl}</select>`
    );
    createEventselect();
    removeclassLoader();
  });
}
function addclassLoader() {
  elements.loaderApi.classList.add('loader');
}
function removeclassLoader() {
  elements.loaderApi.classList.remove('loader');
}
function createEventselect() {
  const selectApi = document.querySelector('.breed-select');
  selectApi.addEventListener('input', selecCat);
}
function addErrorText(){
    elements.errorApi.innerHTML="Oops! Something went wrong! Try reloading the page!";
}
function removeErrorText(){
    elements.errorApi.innerHTML="";
}
export {removeclassLoader,addErrorText};