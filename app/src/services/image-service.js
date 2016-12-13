imageService.$inject = [ '$http', 'apiUrl' ];

export default function imageService($http, apiUrl){
  return{
    get(){
      console.log('apiurl:', apiUrl);
      return $http.get(`${apiUrl}/images`)
        .then(res => res.data);
    },

    remove(id){
      return $http.delete(`${apiUrl}/images/${id}`)
        .then(res => res.data);
    },

    add(image){
      return $http.post(`${apiUrl}/images`, image)
        .then(res => res.data);
    }
  };
}

// service vs factory
  // factory: how you register service with angular.
    // in index.js
  // service: you have constructor function, but service is a generic name
      // this is a service because it's code that angular

  // service is angular's way
  // where you register code so it can use angular's dependency injection

  // making image-service available through the variables in line one.
      // so that it is available through the components.
