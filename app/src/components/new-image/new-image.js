import template from './new-image.html';
import styles from './new-image.scss';

export default {
  template,
  bindings: {
    add: '<'
  },
  controller
};

controller.$inject = ['albumService'];

function controller(albums){
  this.styles = styles;
  this.albumName = '';

  albums.get()
    .then(returnedAlbums => {
      this.myAlbums = returnedAlbums;
    });

  this.reset = () => {
    this.title = '';
    this.description = '';
    this.link = '';
  };

  this.reset();

  this.addImage = () => {
    this.add({
      title: this.title,
      description: this.description,
      link: this.link,
      album: this.albumName._id
    });
    this.reset();
  };
}
