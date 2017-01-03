import template from './image-app.html';
import styles from './image-app.scss';

export default {
  template,
  bindings: {
    albumId: '='
  },
  controller,
  controllerAs: 'app'
};

controller.$inject = ['imageService', 'albumService'];

function controller(images, albums){
  this.loading = true;
  this.$onInit = () => { //executes function using the binding. can't use albumId without this line
    this.styles = styles;
    this.views = ['short', 'thumbnail', 'full', 'all' ];
    this.viewName = 'thumbnail';

    if(this.albumId){ //checks if albumId binding exists
      albums.getImages(this.albumId)
      .then(images => {
        this.loading = false;
        this.images = images;
        console.log('images: ', images);
      });
    } else {
      images.get()
      .then(images => {
        this.loading = false;
        this.images = images;
      });
    }
    this.renderView();

  };


  this.remove = image => {
    this.loading = true;
    console.log('image._id: ', image._id);
    images.remove(image._id)
        .then(() => {
          this.loading = false;
          for(var i = 0; i < this.images.length; i++){
            if(this.images[i]._id == image._id){
              this.images.splice(i, 1);
            }
          }
        })
        .catch(err => {
          console.log(err);
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

  // let albumQuery = {};
  // this.myAlbums.forEach(a => {
  //   albumQuery[a.name] = a._id;
  // });
  //
  // if(albumQuery[])
  //     .then(savedImage => {
  //       this.loading = false;
  //       this.images.push(savedImage);
  //     });


  this.renderView = function(){
    this.shortView = (this.viewName === 'short' || this.viewName === 'all');
    this.fullView = (this.viewName === 'full' || this.viewName === 'all');
    this.thumbnailView = (this.viewName === 'thumbnail' || this.viewName === 'all');
  };

}
