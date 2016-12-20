// this file says to angular: go through everything in the components directory(line 11 -15) and pull it into an object called context
// line 22, loop through context object with .keys() <-- this makes an array of the keys in an object.
//  loops through the keys
// creates a camelcase version of each of the javascript file names because when you declare a component it has to be in camelcase
// add line 26, add each one as a component to angular.
import angular from 'angular';
import camelcase from 'camelcase'; //takes kebab-case and other cases and turns them into camelcase
import path from 'path';

// .context is a method webpack adds to require
const context = require.context(
    './', //start in this directory
    true, //include subdirectories
    /^\.\/(?!index).+?\.js$/ //pull in regex match any .js except this one
);

// create the module to put the resources in,
// in this case directives
const module = angular.module('components', []);

// iterate each of the found required contexts (files)
context.keys().forEach(key => {
    // convert kabob to camel, eg list-item -> listItem
  const name = camelcase(path.basename(key, '.js'));
    // add the component to the components module
  module.component(name, context(key).default);
});

// export the name of the module for
// adding as a dependecy at the app level
export default module.name;
