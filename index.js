const searchElem = document.getElementById('search');

const update = (search) => {
  document.querySelectorAll('.tile').forEach(el => {
    const title = el.getAttribute('data-name');
    if (title.toLowerCase().indexOf(search) > -1 && search.length > 0) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
};

document.querySelectorAll('.shortcuts a').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    update(e.target.innerText.toLowerCase().trim());
    searchElem.value = e.target.innerText;
  });
});

searchElem.addEventListener('keyup', () => {
  update(searchElem.value.toLowerCase().trim());
});

fetch('/pokemon.json')
  .then(resp => resp.json())
  .then(data => {
    let html = '';
    data.forEach(pokemon => {
      const tile = document.createElement('div');
      tile.setAttribute('data-name', pokemon.title);
      tile.className = 'tile';

      const imageDiv = document.createElement('div');
      imageDiv.className = 'image';
      tile.appendChild(imageDiv);

      const titleDiv = document.createElement('div');
      titleDiv.innerText = pokemon.title;
      tile.appendChild(titleDiv);

      const img = document.createElement('img');
      img.src = pokemon.image;
      imageDiv.appendChild(img);

      document.getElementById('pokemon').appendChild(tile);
    });
  });
