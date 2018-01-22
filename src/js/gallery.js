(() => {
  function populateGallery(offset = 0, limit = 4, container, endCallback) {
    axios.get('http://serwismoskito.pl/galeria/read_thumbs.php?limit='+limit+'&offset='+offset)
      .then((response) => {
        const { thumbs, pictures, end } = response.data;
        const gallery = document.createDocumentFragment();
        for (let i = 0; i < thumbs.length; i++) {
          const anchor = document.createElement('a');
          anchor.classList.add('gallery__link');
          anchor.setAttribute('href', pictures[i]);
          anchor.setAttribute('target', '_blank');

          const image = document.createElement('img');
          image.classList.add('gallery__image');
          image.setAttribute('src', thumbs[i]);
          image.setAttribute('alt', 'Zdjęcie');

          anchor.appendChild(image);

          const element = document.createElement('div');
          element.classList.add('gallery__item');
          element.appendChild(anchor);
          gallery.appendChild(element);

        }
        galleryContainer.appendChild(gallery);

        if (end === true) {
          endCallback();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  let currentLimit = 4;
  let currentOffset = 0;

  const loadMoreBtn = document.getElementById('GalleryLoadMore');
  const galleryContainer = document.getElementById('GalleryContainer');

  function disable() {
    loadMoreBtn.classList.add('disabled');
    loadMoreBtn.removeEventListener('click', loadMore);
  }

  function loadMore(e) {
    e.preventDefault();
    currentOffset += currentLimit;
    populateGallery(currentOffset, currentLimit, galleryContainer, disable);
    return false;
  }
  populateGallery(currentOffset, currentLimit, galleryContainer, disable);


  loadMoreBtn.addEventListener('click', loadMore);

})();