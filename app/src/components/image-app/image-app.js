import template from './image-app.html';

export default {
  template,
  controller,
  controllerAs: 'app'
};

controller.$inject = ['imageService'];

function controller(images){

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

// function controller(){
//
//   this.image = {
//     title: 'Calico Bunny',
//     link: 'http://f.cl.ly/items/3g3J1G0w122M360w380O/3726490195_f7cc75d377_o.jpg',
//     description: 'A cute bunny with orange, brown, grey, and black colors'
//   };
//
//
//
//
// }
