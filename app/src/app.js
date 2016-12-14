import angular from 'angular';
import './scss/main.scss';
import components from './components';
import services from './services';
import uiRouter from 'angular-ui-router';
import routes from './routes';

const app = angular.module('myApp', [components, services, uiRouter]);

app.config(routes);

// .value gives the service 'object' directly to angular
// .value defines apiUrl as constant and sets dev as value.
const dev = 'http://localhost:3000/api';
app.value('apiUrl', dev);

// register factory with module called app
  // when we use factory, we give it a name
      // and a function that returns something

// app.factory('apiUrl', function() { return dev; });
