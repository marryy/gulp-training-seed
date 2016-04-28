app.directive('tags', function() {
  return {
    restrict: 'E',
    scope: {
      selectable: '=',
      tags: '=',
      sortByTag: '&'
    },
    templateUrl: 'app/partials/directives/tags.html',
    replace: 'true'
  };
});
