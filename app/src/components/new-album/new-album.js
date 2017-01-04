import template from './new-album.html';
import styles from './new-album.scss';

export default {
  template,
  bindings: {
    add: '<'
  },
  controller
};

function controller(){
  this.styles = styles;

  this.reset = () => {
    this.name = '';
    this.description = '';

  };

  this.reset();

  this.addAlbum = () => {
    this.add({
      name: this.name,
      description: this.description
    });
    this.reset();
  };
}
