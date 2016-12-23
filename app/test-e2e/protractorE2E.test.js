'use strict';

describe('image gallery', function(){
  beforeEach(function(){
    browser.get('/');
  });


  it('has the correct title', function(){
    expect(browser.getTitle()).toEqual('Michelle\'s Image Gallery');
  });

  describe('navigation', function(){
    
    it('defaults to welcome route', function(){
      var uiView = element(by.css('ui-view'));

      function testState(url, componentName){
        expect(browser.getLocationAbsUrl()).toBe(url);
        var component = uiView.all(by.css('*')).first();
        expect(component.getTagName()).toEqual(componentName);
      }
      testState('/', 'welcome');

      var nav = element.all(by.css('header a'));
      var albumGallery = nav.get(1);

      albumGallery.click();

      testState('/images', 'image-app');

    });

  });
});