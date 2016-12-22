routes.$inject = [ '$stateProvider', '$urlRouterProvider' ];

export default function routes($stateProvider, $urlRouterProvider){
  $stateProvider.state({
    name: 'welcome',
    url: '/',
    component: 'welcome'
  });

  $stateProvider.state({ //go to another state of the page.
    name: 'images', //this comes from ui-sref which is angular's version of h ref
    url: '/images', //when i click the ui-sref, go to this link and use the imageApp component.
    component: 'imageApp' //we need camelcase for angular
  });

  $stateProvider.state({
    name: 'about',
    url: '/about',
    component: 'about'
  });

  $urlRouterProvider.otherwise('/');
}
