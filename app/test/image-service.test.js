/* globals angular, chai */

describe('image service', () => {
    const { assert } = chai;

  //we need to mock the services module
    // because image service is there

    beforeEach(
      angular.mock.module('services', { apiUrl: '/api'})
    );

    let $httpBackend = null, imageService = null;

    beforeEach(angular.mock.inject((_imageService_, _$httpBackend_) => {
        $httpBackend = _$httpBackend_;
        imageService = _imageService_;
    }));

    afterEach(() => {
      // make sure the $httpBackend expectations that we set up have happened

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('get images', done => {
      // mock returns data from images get
        const images = [1,2,3];
        $httpBackend
          .expectGET('/api/images')
          .respond(images);

        imageService.get()
          .then((allImages) => {
              assert.deepEqual(allImages, images);
              done();
          })
          .catch(done);

        //tell $httpBackend everything is set up and okay
        // to 'flush' (send) responses black
        $httpBackend.flush();
    });

    it('add image', done => {
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
});
