albumService.$inject = [ '$http', 'apiUrl' ];

export default function albumService($http, apiUrl){
  return{
    get(){
      return $http.get(`${apiUrl}/albums`)
        .then(res => res.data);
    },

    getImages(album_id){
      return $http.get(`${apiUrl}/albums/${album_id}/images`)
        .then(res => res.data);
    },

    remove(id){
      console.log('remove in service getting called');
      return $http.delete(`${apiUrl}/albums/${id}`)
        .then(res => {
          console.log('then in remove getting called');
          res.data;

        });
    },

    add(album){
      return $http.post(`${apiUrl}/albums`, album)
        .then(res => res.data);
    }
  };
}
