import angular from 'angular';
import camelcase from 'camelcase';
import path from 'path';

// webpack adds .context to the require method
const context = require.context(
  './', //the current directory
  true, //include subdirectories
  /^\.\/(?!index).+?\.js$/ //regex match any .js except this one
);

// create a module to put the resources in,
// in this case, services

const module = angular.module('services', []);

// iterate over each of the found contexts files
context.keys().forEach(key => {
  //convert kebab to camel, list-item -> listItem

  const name = camelcase(path.basename(key, '.js'));

  module.factory(name, context(key).default);
});

export default module.name;
