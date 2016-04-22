app.directive('bookmarks', function($parse) {
  return {
    restrict: "E",
    scope: {
        bookmarks: '=',
        deleteBookmark: '&'
    },
    templateUrl: 'app/partials/directives/bookmarks.html',
    link: function(scope, $elem, attrs) {
    },
    controller: function($scope, $resource, Bookmark) {

      // $scope.deleteBookmark = function(bookmarkId) {
      //   Bookmark.get({ id: bookmarkId }, function(bookmarkToDel) {
      //     $scope.bmark = bookmarkToDel;
      //     $scope.bmark.$delete({id: bookmarkId}, function() {
      //       $scope.bookmarks = $scope.getBookmarks();
      //     });
      //   });
      // }
    }
  };
});
