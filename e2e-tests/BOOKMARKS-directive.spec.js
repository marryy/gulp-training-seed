'use strict';

describe('bookmarks directive test', function() {
  var $compile, $rootScope, directiveBuilder, directive, scope;

  beforeEach(module('bookmarks'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));


  it('should have jquery bookmark', function() {

    //"[{\'id\':4, \'title\': \'alabala\'}, {\'id\':8, \'title\': \'bbbb\'}]"
    var element = $compile('<bookmarks bookmarks="[{\'id\':0, \'title\': \'jQuery1\'}, {\'id\':8, \'title\': \'bbbb\'}]"></bookmarks>')($rootScope);
    $rootScope.$apply();

    expect(element.isolateScope().bookmarks[0]).toEqual({"id": 0,"title": "jQuery1"});
  });

  it('should have delete bookmark on delete-btn click', function() {

    //"[{\'id\':4, \'title\': \'alabala\'}, {\'id\':8, \'title\': \'bbbb\'}]"
    var element = $compile('<bookmarks bookmarks="[{\'id\':0, \'title\': \'jQuery1\'}, {\'id\':8, \'title\': \'bbbb\'}]"></bookmarks>')($rootScope);
    $rootScope.$apply();

    var deleteBtn = element.find('a')[1];
    deleteBtn.triggerHandler('click');
  });
});
