app.directive('tags', function($parse) {
  return {
    restrict: "E",
    scope: {
      selectable: '=',
      tags: '=',
      sortByTag: '&'
    },
    templateUrl: 'app/partials/directives/tags.html',
    replace: 'true',
    link: function(scope, elem, attrs) {

    }
  };
});
