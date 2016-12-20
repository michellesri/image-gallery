import template from './new-image.html';
import styles from './new-image.scss';

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
      album: this.album
    });
    this.reset();
  };
}
