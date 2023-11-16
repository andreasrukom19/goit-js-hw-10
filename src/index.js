import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
}

for (key in refs) {
  if (key !== 'breedSelect') {
    onSetClass(refs[key]);
  }
}

function onSetClass(elem) {
  elem.classList.add('is-hidden');
}

function onDelClass(elem) {
  elem.classList.remove('is-hidden');
}

fetchBreeds().then(breeds => {
  const data = breeds.map(breed => `<option value=${breed.id}>${breed.name}</option>`).join('');
  refs.breedSelect.insertAdjacentHTML('beforeend', data);
  new SlimSelect({
    select: refs.breedSelect,
  });
}).catch(onError)

refs.breedSelect.addEventListener('change', onBreedSelect);

function onBreedSelect(event) {
  onDelClass(refs.loader);
  for (key in refs) {
    if (key !== 'loader') {
      onSetClass(refs[key]);
    }
  }
  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId).then(data => {
    onSetClass(refs.loader);
    onDelClass(refs.breedSelect);
    const { url, breeds } = data[0];

    refs.catInfo.innerHTML = `
      <div class="picture-block">
        <img src="${url}" alt="${breeds[0].name}" width="600"/>
      </div>
      <div class="description-block">
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p><b>Temperament:</b> ${breeds[0].temperament}</p>
      </div>`;
    onDelClass(refs.catInfo);
  }).catch(onError)
}

function onError() {
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-top',
    width: '400px',
    timeout: 5000,
  })
}