describe('tags directive', function () {
  var element, $scope;

  beforeEach(module("bookmarks"));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;

    $scope.tags = ['angular', 'html', 'javascript', 'jasmine', 'karma'];

    element = angular.element('<tags selectable="true" tags="tags" sort-by-tag="sortByTag(tag)"></tags>');
    $compile(element)($rootScope);

    $scope.$digest();
  }))

  it("should have tags loaded", function() {
    console.log(element);
    expect(element.isolateScope().tags.length).toEqual(5);
    expect(element.isolateScope().tags[2]).toEqual("javascript");
  });

  it("should have a 'sortByTag' function defined", function() {
    expect(element.isolateScope().sortByTag).toEqual(jasmine.any(Function));
  });

  it("should have assigned a 'true' value to selectable", function() {
    expect(element.isolateScope().selectable).toBe(true);
  });
});
