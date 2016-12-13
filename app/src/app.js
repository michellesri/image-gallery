import angular from 'angular';
import './css/main.css';
import components from './components';
import services from './services';

const app = angular.module('myApp', [components, services]);

const dev = 'http://localhost:3000/api';

// .value gives the service 'object' directly to angular
// .value defines apiUrl as constant and sets dev as value.
app.value('apiUrl', dev);

// register factory with module called app
  // when we use factory, we give it a name
      // and a function that returns something

// app.factory('apiUrl', function() { return dev; });
