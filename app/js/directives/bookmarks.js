app.directive('bookmarks', function() {
  return {
    restrict: 'E',
    scope: {
        bookmarks: '=',
        deleteBookmark: '&'
    },
    templateUrl: 'app/partials/directives/bookmarks.html'
  };
});
