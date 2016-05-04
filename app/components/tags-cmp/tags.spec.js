'use strict';

describe('tags directive testing', function() {
  var $compile, $rootScope, directiveBuilder, directive;

  beforeEach(module('bookmarks'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));


  it('should have fifi tag in a span', function() {

    var element = $compile('<tags tags="[\'bla\', \'blo\', \'fifi\']"></tags>')($rootScope);
    $rootScope.$apply();
    expect(element.html()).toContain('fifi');
  });
});
