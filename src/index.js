 import axios from 'axios';
 import '/node_modules/slim-select/dist/slimselect.css';
 import SlimSelect from 'slim-select';
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
function createSelectedCat() {
  fetchBreeds().then(cats => {
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
      `<select class="breed-select" style="width: 200px;
      margin-left: 40%;">${optionEl}</select>`
    );
    searchCat()
    removeclassLoader();
  });
}
function searchCat(){
  const selectApi = document.querySelector('.breed-select');
  const sel = new SlimSelect({
    select: '.breed-select',
    events: {
      afterChange: (newVal) => {
        addclassLoader();
        console.log(newVal);
        elements.blockCat.innerHTML = '';
        fetchCatByBreed((newVal[0].value).toString()).then(cat => {
          elements.blockCat.innerHTML = `<img class="imgcat" src="${cat[0].url}" alt="${cat[0].breeds[0].name}">
         <div class="text-info">
         <h1>${cat[0].breeds[0].name}</h1>
         <p>${cat[0].breeds[0].description}</p>
         <p><b><span>Temperament:  </span></b>${cat[0].breeds[0].temperament}</p>
         </div>
         `;
         removeclassLoader();
        });
      }
    }
  })
}
function addclassLoader() {
  elements.loaderApi.classList.add('loader');
}
function removeclassLoader() {
  elements.loaderApi.classList.remove('loader');
}
export {removeclassLoader};
 
