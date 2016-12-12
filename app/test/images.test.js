/*globals angular, chai */

describe('images component', () => {

    const { assert } = chai;

  //need to mock components module because that's
    //where images component lives

    beforeEach(
      angular.mock.module('components')
    );

    let $component = null;
    beforeEach(angular.mock.inject($componentController => {
        $component = $componentController;
    }));

    describe('create component', () => {

        const images = [
            {
                title: 'mario mushroom',
                link: 'http://www.mariowiki.com/images/thumb/9/94/MushroomMarioKart8.png/200px-MushroomMarioKart8.png',
                description: 'red mushroom top with white spots'
            },

            {
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

        const imageService = {
            get(){
                return Promise.resolve(images);
            },

            add(){
                return Promise.resolve(image);
            }
        };

        const component = $component('images', { imageService });

        it('loads images', done => {
            assert.isOk(component.loading);

            setTimeout(() => {
                assert.equal(component.images, images);
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
    });
});
