import template from './image-app.html';

export default {
  template,
  controller,
  controllerAs: 'app'
};

function controller(){

  this.image = {
    title: 'Calico Bunny',
    link: 'http://f.cl.ly/items/3g3J1G0w122M360w380O/3726490195_f7cc75d377_o.jpg',
    description: 'A cute bunny with orange, brown, grey, and black colors'
  };
  
  this.renderView = function(){
    this.shortView = (this.viewName === 'short' || this.viewName === 'all');
    this.fullView = (this.viewName === 'full' || this.viewName === 'all');
    this.thumbnailView = (this.viewName === 'thumbnail' || this.viewName === 'all');
  };

  this.views = ['short', 'thumbnail', 'full', 'all' ];
  this.viewName = 'all';

  this.renderView();

}
