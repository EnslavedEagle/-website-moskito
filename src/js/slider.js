(() => {
  class Slider {
    constructor(slider, navigation) {
      this.slider = slider;
      this.navigation = navigation;
      this.active = 0;
      this.slidesCount = this.slider.childElementCount;
      this.slides = this.slider.children;

      for (let i = 0, length = this.navigation.length; i < length; i++) {
        ((i) => this.navigation[i].children[0].addEventListener('click', () => this.setActiveSlide(i)))(i);
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
    document.getElementById('slider__options').children
  );
})();