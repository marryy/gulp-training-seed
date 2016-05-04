app.directive('tags', function() {
  return {
    restrict: 'E',
    scope: {
      selectable: '=',
      tags: '=',
      sortByTag: '&'
    },
    templateUrl: 'app/components/tags-cmp/tags.html',
    replace: 'true'
  };
});
