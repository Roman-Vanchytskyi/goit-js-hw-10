import Notiflix from 'notiflix';
const URL = 'https://restcountries.com/v3.1/name/';
const params = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${URL}${name}?${params}`).then(response => {
    if (!response.ok || response.status === 404) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// .catch(err =>
//       Notiflix.Notify.failure('Oops, there is no country with that name')
//     );
