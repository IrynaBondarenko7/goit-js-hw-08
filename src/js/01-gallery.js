// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');

//create link in which we place img
const imgElements = galleryItems
  .map(item => {
    return `<a class="gallery__item" href="${item.original}"><img class="gallery__image" src="${item.preview}" alt="${item.description}" title="${item.description}"/></a>`;
  })
  .join('');

//put into DOM
galleryContainer.insertAdjacentHTML('beforeend', imgElements);

new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
