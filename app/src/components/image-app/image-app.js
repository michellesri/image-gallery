import template from './image-app.html';
import styles from './image-app.scss';

export default {
  template,
  controller,
  controllerAs: 'app'
};

controller.$inject = ['imageService'];

function controller(images){

  this.styles = styles;
  this.loading = true;

  images.get()
    .then(images => {
      this.loading = false;
      this.images = images;
    });

  this.remove = image => {
    this.loading = true;
    images.remove(image._id)
        .then(() => {
          this.loading = false;
          const index = this.images.indexOf(image);
          if (index > -1) this.images.splice(index, 1);
        });
  };

  this.add = image => {
    this.loading = true;
    images.add(image)
        .then(savedImage => {
          this.loading = false;
          this.images.push(savedImage);
        });
  };

  this.views = ['short', 'thumbnail', 'full', 'all' ];

  this.renderView = function(){
    this.shortView = (this.viewName === 'short' || this.viewName === 'all');
    this.fullView = (this.viewName === 'full' || this.viewName === 'all');
    this.thumbnailView = (this.viewName === 'thumbnail' || this.viewName === 'all');
  };
  this.viewName = 'all';
  this.renderView();

}
