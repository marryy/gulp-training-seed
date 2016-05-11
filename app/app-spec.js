describe('app controller', function () {
var $scope, $controller, controller;

  beforeEach(function () {
    angular.mock.module("bookmarks");
  });

  beforeEach(inject(function ($injector) {
    Bookmark = $injector.get('Bookmark');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    // $httpBackend.verifyNoOutstandingRequest();
  });

  beforeEach(inject(function($rootScope, _$controller_) {
    $scope = $rootScope.$new();
    $controller = _$controller_;

    controller = $controller('appController', {$scope: $scope});

    $httpBackend.when('GET', /bookmarks/).respond([]);
  }));

  describe('when created', function () {
    var bookmarks = [
      {"_id": {"$oid": 234}, "name": "Angularjs", "url": "www.angular.com", "tags": ["angular", "html", "jasmine"]},
      {"_id": {"$oid": 5673}, "name": "HTML", "url": "www.htmloi.com", "tags": ["javascript", "html"]}
    ];

    it('should have a "getBookmarks" function defined', function() {
      expect($scope.getBookmarks).toEqual(jasmine.any(Function));
    });

    it('should have a "sortByTag" function defined', function() {
      expect($scope.sortByTag).toEqual(jasmine.any(Function));
    });

    it('should have a "deleteBookmark" function defined', function() {
      expect($scope.deleteBookmark).toEqual(jasmine.any(Function));
    });

    it('should have a "save" function defined', function() {
      expect($scope.save).toEqual(jasmine.any(Function));
    });

    it('should have a "cancel" function defined', function() {
      expect($scope.cancel).toEqual(jasmine.any(Function));
    });

    it('should render all the bookmarks on init', function() {
      $httpBackend.expect('GET', /bookmarks/).respond(bookmarks);

      $scope.getBookmarks();
      $httpBackend.flush();

      expect($scope.bookmarks.length).toEqual(2);
      expect($scope.bookmarks[1].name).toEqual("HTML");
    });

    it("should clear the bookmark object on 'cancel' click", function() {
      $scope.bookmark = {"name": "fafa", "url": "fafa.com"};

      $scope.cancel();
      expect($scope.bookmark).toEqual({});
    });

    it('should make a delete request after calling the "deleteBookmark" function', function () {
      controller = $controller('appController', {$scope: $scope});
      $scope.bookmarks = bookmarks;

      $scope.deleteBookmark(234);

      $scope.$digest();

      expect($scope.bookmarks.length).toEqual(1);
      expect($scope.bookmarks).toEqual([{"_id": {"$oid": 5673}, "name": "HTML", "url": "www.htmloi.com", "tags": ["javascript", "html"]}]);
    });

    it('should make a put request after calling the "save" function', function () {
      controller = $controller('appController', {$scope: $scope});
      $scope.bookmarks = $scope.allBookmarks = bookmarks;

      $scope.sortByTag("jasmine");
      $scope.$digest();

      expect($scope.bookmarks.length).toEqual(1);
      expect($scope.bookmarks).toEqual([{"_id": {"$oid": 234}, "name": "Angularjs", "url": "www.angular.com", "tags": ["angular", "html", "jasmine"]}]);
    });
  });
});
