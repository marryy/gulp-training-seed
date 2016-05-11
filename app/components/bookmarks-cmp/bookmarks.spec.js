describe('customers component', function () {
  var element, $scope;

  beforeEach(module("bookmarks"));

  beforeEach(inject(function ($injector) {
    Bookmark = $injector.get('Bookmark');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  beforeEach(inject(function($compile, $rootScope) {
    $httpBackend.when('GET', /bookmarks/).respond([]);
    $scope = $rootScope;

    $scope.bms = [
      {"_id": {"$oid": 234}, "name": "Angularjs", "url": "www.angular.com", "tags": ['angular','html','jasmine']},
      {"_id": {"$oid": 5673}, "name": "HTML", "url": "www.htmloi.com", "tags": ['javascript','html']}
    ];

    element = angular.element('<bookmarks bookmarks="bms" delete-bookmark="deleteBookmark(id)"></bookmarks>');
    $compile(element)($rootScope);

    $scope.$digest();
  }))

  it("should have bookmarks loaded", function() {
    expect(element.isolateScope().bookmarks.length).toEqual(2);
    expect(element.isolateScope().bookmarks[0].name).toEqual("Angularjs");
  });

  it("should render correctly elements", function() {
    expect(element.isolateScope().deleteBookmark).toEqual(jasmine.any(Function));

    var anchors = element.find("a");

    expect(anchors.length).toBe(4);
    expect(anchors[0].href).toContain("/edit/bookmark/234");
  });

  it('should make a delete request after calling the "deleteBookmark" function', function () {
    spyOn(element.isolateScope(), 'deleteBookmark');
    spyOn(Bookmark, 'delete');

    element.isolateScope().deleteBookmark(234);

    expect(element.isolateScope().deleteBookmark).toHaveBeenCalledWith(234);
  });
});
