/* globals angular, chai */

describe('image service', () => {
  const { assert } = chai; //make variable named assert. value of this variable is assert property found in chai

  //we need to mock the services module
    // because image service is there

  beforeEach(
      angular.mock.module('services', { apiUrl: '/api'})
      // create mock versions of the dependencies that image service is asking for.
    );

  let $httpBackend = null, imageService = null;

// inject two services.
  beforeEach(angular.mock.inject((_imageService_, _$httpBackend_) => { // use httpbackend instead of http because angular has built-in.
    $httpBackend = _$httpBackend_; //look in angular for http backend. things with $ are angular.
    imageService = _imageService_; //look in my own angular app for imageservice.
  }));

  afterEach(() => {
      // make sure the $httpBackend expectations that we set up have happened

    $httpBackend.verifyNoOutstandingExpectation(); //if you call expect in your test and nothing comes back, then throw an error.
    $httpBackend.verifyNoOutstandingRequest();
  });

  const image = {
    title: 'testImage',
    link: 'http://www.testImage.com',
    description: 'image for testing purposes'
  };

  it('get images', done => {
      // mock returns data from images get
    const images = [1,2,3];
    $httpBackend
          .expectGET('/api/images') //angular test. tell httpbackend to expect someone to say get to this route
          .respond(images); //when they do then reply with images.

    imageService.get()
          .then((allImages) => {
            assert.deepEqual(allImages, images);
            done();
          })
          .catch(done);

        //tell $httpBackend everything is set up and okay
        // to 'flush' (send) responses black
    $httpBackend.flush(); //if the test fails, reset httpBackend so that another test can start.
  });

  it('adds image', done => {
    const image = {
      title: 'Calico Bunny',
      link: 'http://f.cl.ly/items/3g3J1G0w122M360w380O/3726490195_f7cc75d377_o.jpg',
      description: 'A cute bunny with orange, brown, grey, and black colors'
    };

    $httpBackend
          .expectPOST('/api/images', image)
          .respond(image);

    imageService.add(image)
          .then(savedImage => {
            assert.deepEqual(savedImage, image);
            done();
          })
          .catch(done);

    $httpBackend.flush();
  });

  it('removes image', done => {

    $httpBackend
      .expectDELETE('/api/images/1')
      .respond(image);

    imageService
        .remove(1)
        .then((deletedImage) => {
          assert.deepEqual(deletedImage, image);
          done();
        })
        .catch(done);

    $httpBackend.flush();

  });
});
