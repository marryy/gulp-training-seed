describe("rest service", function() {
  var Bookmark, $httpBackend;

  beforeEach(module('bookmarkService'));

  beforeEach(inject(function ($injector) {
    Bookmark = $injector.get('Bookmark');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a "get" function defined', function () {
    expect(Bookmark.get).toEqual(jasmine.any(Function));
  });

  it('should have an "update" function defined', function () {
    expect(Bookmark.update).toEqual(jasmine.any(Function));
  });

  it('should have a "save" function defined', function () {
    expect(Bookmark.save).toEqual(jasmine.any(Function));
  });

  it('should have a "remove" function defined', function () {
    expect(Bookmark.delete).toEqual(jasmine.any(Function));
  });

  it('should send a PUT request on update', function () {
    $httpBackend.expectPUT(/bookmark/).respond({});
    Bookmark.update();
    $httpBackend.flush();
  });

  it('should make a DELETE request on "delete"', function () {
    var bookmark = { _id: { $oid: '5721c44ff8c2e776a0274859' }, "name": "Angular", "URL": "https://angular.github.io/protractor/#/tutorial", "tags": ['angular','javascript','jasmine'] };

    $httpBackend.expectDELETE(/5721c44ff8c2e776a0274859/).respond({});
    Bookmark.delete(bookmark);
    $httpBackend.flush();
  });

});
