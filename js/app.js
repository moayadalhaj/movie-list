'use strict';

let renderList = document.getElementById('renderList');
let movieForm = document.getElementById('movieForm');
let clearData = document.getElementById('clearData');

function Movies(name, image, release) {
  this.name = name;
  this.image = image;
  this.release = release;
  allMovies.push(this);
}
let allMovies = [];

function renderMovies() {
  renderList.textContent = '';
  for (let i = 0; i < allMovies.length; i++) {
    let trElement = document.createElement('tr');
    renderList.appendChild(trElement);
    let tdElement0 = document.createElement('td');
    let tdElement1 = document.createElement('td');
    let imgElement = document.createElement('img');
    let tdElement2 = document.createElement('td');
    let tdElement3 = document.createElement('td');

    imgElement.src = allMovies[i].image;
    tdElement1.appendChild(imgElement);
    tdElement0.textContent = 'X';
    tdElement0.id = i;
    tdElement2.textContent = allMovies[i].name;
    tdElement3.textContent = allMovies[i].release;
    trElement.appendChild(tdElement0);
    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);
    trElement.appendChild(tdElement3);
  }
}

function showMovies(event) {
  event.preventDefault();
  let name = event.target.name.value;
  let image = `../img/${event.target.imageSelector.value}.png`;
  let release = event.target.release.value;
  new Movies(name, image, release);
  renderMovies();
  localStorage.setItem('data', JSON.stringify(allMovies));
  movieForm.reset()
}
movieForm.addEventListener('submit', showMovies);

function clearAllData(event) {
  localStorage.removeItem('data');
  allMovies = [];
  renderMovies();
}
clearData.addEventListener('click', clearAllData);

function deleteItem(event) {
  if (event.target.id) {
    allMovies.splice(event.target.id, 1);
    localStorage.removeItem('data');
    localStorage.setItem('data', JSON.stringify(allMovies));
    renderMovies();
  }
}
renderList.addEventListener('click', deleteItem);

function getData() {
  let data = JSON.parse(localStorage.getItem('data'));
  if (data) {
    for (let i = 0; i < data.length; i++) {
      new Movies(data[i].name, data[i].image, data[i].release);
    }
  }
  renderMovies();
}
getData();
