import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(search, DEBOUNCE_DELAY));

function search(e) {
  const searchData = e.target.value.trim();
  console.log(searchData);
  if (!searchData) {
    list.innerHTML = '';
    info.innerHTML = '';
    return;
  }

  fetchCountries(searchData)
    .then(arr => {
      if (arr.length > 10) {
        list.innerHTML = '';
        info.innerHTML = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (arr.length > 1 && arr.length < 11) {
        list.innerHTML = createListMarkup(arr);
        info.innerHTML = '';
      }
      if (arr.length === 1) {
        info.innerHTML = createInfoMarkup(arr);
        list.innerHTML = '';
      }
    })
    .catch(() => {
      list.innerHTML = '';
      info.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function createListMarkup(arr) {
  return arr
    .map(
      arr =>
        `<li class='item'><img class='img' src="${arr.flags.png}" alt="${arr.name.official}"width="50"><span class='pre-title'>${arr.name.official}</span></li>`
    )
    .join('');
}
function createInfoMarkup(arr) {
  return arr
    .map(
      arr =>
        `<li>
      <img src="${arr.flags.svg}" alt="${arr.name.official}" width="70">
        <span class='title'>${arr.name.official}</span>
            <p><b>Capital</b>: ${arr.capital}</p>
            <p><b>Population</b>: ${arr.population}</p>
            <p><b>Languages</b>: ${Object.values(arr.languages)} </p>
                </li>`
    )
    .join('');
}
