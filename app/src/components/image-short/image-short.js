import template from './image-short.html';
import styles from './image-short.scss';

export default {
  template,
  bindings: {
    image: '='
  },
  controller
};

function controller(){
  this.styles = styles;
}
