app.directive('bookmarks', function($parse) {
  return {
    restrict: "E",
    scope: {
        bookmarks: '=',
        deleteBookmark: '&'
    },
    templateUrl: 'app/partials/directives/bookmarks.html'
  };
});
