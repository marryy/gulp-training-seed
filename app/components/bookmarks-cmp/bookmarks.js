app.directive('bookmarks', function() {
  return {
    restrict: 'E',
    scope: {
        bookmarks: '=',
        deleteBookmark: '&'
    },
    templateUrl: 'app/components/bookmarks-cmp/bookmarks.html'
  };
});
