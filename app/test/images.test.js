/*globals angular, chai */

describe('images component', () => {

  const { assert } = chai;

  //need to mock components module because that's
    //where images component lives

// to use before, instead of beforeEach, this is required:
  angular.mock.module.sharedInjector();

// telling angular mock that these are the files that i'm going be working with. 'components'
  before(
      angular.mock.module('components')
    );

  let $component = null;

// allows $component to be used as a method to take our individual components
// angular give me the method that will let me call an individual component and mock it for testing.
  before(angular.mock.inject($componentController => {
    $component = $componentController;
  }));

  describe('create component', () => {

    const images = [
      {
        _id: 1,
        title: 'mario mushroom',
        link: 'http://www.mariowiki.com/images/thumb/9/94/MushroomMarioKart8.png/200px-MushroomMarioKart8.png',
        description: 'red mushroom top with white spots'
      },

      {
        _id: 2,
        title: 'tilted anchor',
        link: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTftqx7hb1tZedcrr3b4nxJXg9TGGKbDOL3-kIr-DLud6ne5MOFS68IfA',
        description: 'a blue anchor tilted towards the east'
      }
    ];

    const image = {
      title: 'plain basketball',
      link: 'http://nolancatholichs.org/wp-content/uploads/2016/10/bigstock-Basketball-With-Dark-Backgroun-60997760.jpg',
      description: 'plain basketball sitting on gym floor'
    };

    const _id = 123;

//fake image service that hands back simple data that i defined above.
    const imageService = {
      get(){
        return Promise.resolve(images);
      },

      add(image){
        image._id = _id;
        return Promise.resolve(image);
      },

      remove(image_id){
        assert.isOk(image_id); //when imageService.remove (angular mocks for test) is called by my imageApp component, assert that i'm getting something.
        assert.equal(image_id, 123); //is imageService.remove getting the id for the test image.
        return Promise.resolve();
      }
    };

    const albums = [
      {
        name: 'testAlbum',
        description: 'test description'
      }
    ];


    const albumService = {
      get(){
        return Promise.resolve(albums);
      },

      add(album){
        album._id = _id;
        return Promise.resolve(album);
      }
    };

    let component = null;
    before(() => {
      component = $component('imageApp', { imageService, albumService });
      component.$onInit();

    });

    it('loads images', done => {
      assert.isOk(component.loading);

      setTimeout(() => {
        assert.deepEqual(component.images, images);

        assert.isNotOk(component.loading);
        done();
      });
    });

    it('adds an image', done => {
      component.add(image);

      setTimeout(() => {
        assert.equal(images.length, 3);
        assert.equal(images[2], image);
        done();
      });
    });

    it('removes an image', done => {
      //const component = $component('imageApp', { imageService, albumService });
      component.remove(image);
      assert.isOk(component.loading);

      setTimeout(() => { //wait 0 miliseconds so that immediate flow of javascript so that things waiting in the resolved async cache can get executed.
        assert.isNotOk(component.loading);
        assert.equal(component.images.length, 2);
        done();
      });
    });

  });
});
