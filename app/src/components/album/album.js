import template from './album.html';
import styles from './album.scss';

export default {
  template,
  controller,
  controllerAs: 'albumCtrl'
};

controller.$inject = ['albumService'];

function controller(albums){
  this.styles = styles;

  albums.get().then(returnedAlbums => {
    this.myAlbums = returnedAlbums;
  });

  this.setCurrent = albumName => {
    this.currentAlbum = albumName;
  };

  this.add = album => {
    this.loading = true;
    albums.add(album)
        .then(savedAlbum => {
          this.loading = false;
          this.myAlbums.push(savedAlbum);
        });
  };
}

// album button
// make relationship between routes and model
