(() => {
  class Slider {
    constructor(slider, navigation, outerLinks) {
      this.slider = slider;
      this.navigation = navigation;
      this.active = 0;
      this.slidesCount = this.slider.childElementCount;
      this.slides = this.slider.children;
      this.outerLinks = outerLinks

      for (let i = 0, length = this.navigation.length; i < length; i++) {
        ((i) => this.navigation[i].children[0].addEventListener('click', () => this.setActiveSlide(i)))(i);
      }
      for (let i = 0, length = this.outerLinks.length; i < length; i++) {
        ((i) => this.outerLinks[i].addEventListener('click', () => {
          const index = (i === length-1) ? i-1 : i; // ikonki 3 i 4 mają wspólny slajd
          document.getElementById('oferta').scrollIntoView();
          this.setActiveSlide(index);
        }))(i);
      }
      this.setActiveSlide(0);
    }

    setActiveSlide(index) {
      index = +index;
      if (index < 0 || index > this.slidesCount) {
        return ;
      }

      for (let i = 0, length = this.slides.length; i < length; i++) {
        this.slides[i].classList.remove('active');
        this.navigation[i].classList.remove('prev', 'next');
      }

      this.slides[index].classList.add('active');

      if (this.navigation[index - 1]) {
        this.navigation[index - 1].classList.add('prev');
      }
      if (this.navigation[index + 1]) {
        this.navigation[index + 1].classList.add('next');
      }
    }
  }

  const slider = new Slider(
    document.getElementById('slider'),
    document.getElementById('slider__options').children,
    document.querySelectorAll('#montaz_serwis_types li')
  );
})();