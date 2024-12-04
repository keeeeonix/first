//Отримання даних з JSON і відображення їх на сторінці
fetch('data/movies.json')
  .then(response => response.json())
  .then(data => {
    const movieList = document.querySelector('.movie-list');

    data.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.classList.add('movie-card');
      movieItem.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      `;
      movieList.appendChild(movieItem);
    });
  });