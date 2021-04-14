import images from './gallery-items.js';
// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

const gallery = document.querySelector('.js-gallery');
const modalForGallery = document.querySelector('.js-lightbox');
const imgForModal = modalForGallery.querySelector('.lightbox__image');
const closeModaleBtn = document.querySelector('button[data-action="close-lightbox"]');
const modalBackdrop = modalForGallery.querySelector('div.lightbox__overlay')

const galleryMarkup = makeGalleryMarkap(images);
gallery.insertAdjacentHTML('beforeend', galleryMarkup)
const galleryLinks = document.querySelectorAll('.gallery__link');
galleryLinks.forEach(link => {
    link.setAttribute('onclick', 'return false')
});


gallery.addEventListener('click', openModalOnClick);
closeModaleBtn.addEventListener('click', closeMoalOnClick);
document.addEventListener('keydown', changeImagesWithArrowKeys);
modalBackdrop.addEventListener('click', onModalBackdropClick)



function makeGalleryMarkap(images) {
    return images.map(({ preview, original, description }) => {
        return `
      <li class="gallery__item">
       <a class="gallery__link"  href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
       </a>
      </li>
        `
    }).join('')
};

function getOriginalSrc(e) {
    if (!e.target.classList.contains('gallery__image')) {
        return;
    }
    return e.target.dataset.source;
};

function openModalOnClick(e) {
    if (!e.target.classList.contains('gallery__image')) {
        return;
    };
    modalForGallery.classList.add("is-open");
    imgForModal.src = getOriginalSrc(e);

     window.addEventListener('keydown', onEscKeyPress);
    
};

function closeMoalOnClick() {
    modalForGallery.classList.remove("is-open");
    imgForModal.src = ' ';

     window.removeEventListener('keydown', onEscKeyPress);

};

function onEscKeyPress(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;

  if (isEscKey) {
    closeMoalOnClick();
  }
};

function changeImagesWithArrowKeys(e) {
    let newIndex = images.findIndex(image => image.original === imgForModal.src);
  if (newIndex < 0) {
    return;
  }
  if (e.code === 'ArrowLeft') {
    newIndex -= 1;
    if (newIndex === -1) {
      newIndex = images.length - 1;
    }
  } else if (e.code === 'ArrowRight') {
    newIndex += 1;
    if (newIndex === images.length) {
      newIndex = 0;
    }
  }
  imgForModal.src = images[newIndex].original;
};

function onModalBackdropClick(e) {
    if (e.target === e.currentTarget) {
        closeMoalOnClick();
    };

};



