import angular from 'angular';
import camelcase from 'camelcase';
import path from 'path';

// webpack adds .context to the require method
const context = require.context(
  './', //the current directory
  true, //include subdirectories
  /^\.\/(?!index).+?\.js$/ //regex match any .js except this one
);

// code above says go through services directory.

// create a module to put the resources in,
// in this case, services

const module = angular.module('services', []);
  //creating a module called services. when you create it, starts with empty array
    //but then we add this factory function to it on line 25.

// iterate over each of the found contexts files
context.keys().forEach(key => {
  //convert kebab to camel, list-item -> listItem
  const name = camelcase(path.basename(key, '.js'));

  module.factory(name, context(key).default);
    //same as writing import imageService from './image-service'
      //then add factory method on the module
        // this makes service code avaialbe to angular components
});

export default module.name;

// top code is replaced with the bottom code
// every time i create a new service, i need to add it to the file.
// import newService from './newexampleservice';
//   add .factory('newservice', newservice)
//
// import angular from 'angular';
// import imageService from './image-service';
// const module = angular.module('services', [])
//   .factory('imageService', imageService);
//
// export default module.name;

// .factory is angular magic that lets you use services in your components
// makes the service into something that's injectable.
