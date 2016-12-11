import angular from 'angular';
import './css/main.css';
import components from './components';
import services from './services';

const app = angular.module('myApp', [components, services]);

const dev = 'http://localhost:3000/api';

// .value gives the service 'object' directly to angular
app.value('apiUrl', dev);

app.factory('apiUrl', function() { return dev; });
