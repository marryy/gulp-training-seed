var app = angular.module('bookmarks', ['ui.router', 'ngResource', 'bookmarkService']);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('bookmarks', {
      url: '/',
      templateUrl: "app/components/homepage-cmp/homepage.html",
      controller: function($scope, $resource, Bookmark) {
        $scope.tags = [];

        function getUniqueTags(array) {
          var sorted = array.sort();
          var resultArray = [];
          for(var i = 0; i < array.length; i++) {
            if(resultArray[resultArray.length-1] != array[i]) {
              resultArray[resultArray.length] = array[i];
            }
          }
          return resultArray;
        }

        $scope.getBookmarks = function() {
          return Bookmark.query(function(resultBookmarks) {
            resultBookmarks.forEach(function(bookmark) {
              $scope.tags = $scope.tags || [];
              var tags = bookmark.tags;
              tags.forEach(function(tag) {
                $scope.tags.push(tag);
              });
            });
            $scope.tags = getUniqueTags($scope.tags);
          });
        };

        $scope.allBookmarks = $scope.getBookmarks();
        $scope.bookmarks = $scope.bookmarks || $scope.allBookmarks;

        $scope.sortByTag = function(tag) {
          $scope.bookmarks = $scope.allBookmarks.filter(function(bookmark) {
            return bookmark.tags.indexOf(tag) > -1;
          });
        };

        $scope.deleteBookmark = function(bookmarkId) {
          Bookmark.get({ id: bookmarkId }, function(bookmarkToDel) {
            $scope.bmark = bookmarkToDel;

            $scope.bmark.$delete({id: bookmarkId}, function() {
              $scope.bookmarks = $scope.getBookmarks();
            });
          });
        };

        $scope.save = function(bookmark) {
          var newBookmark = new Bookmark();
          var tagsArray = [];
          var tags = bookmark.tags.split(",");
          tags.forEach(function(tag) {
            tagsArray.push(tag);
          });
          bookmark.tags = tagsArray;
          newBookmark = bookmark;

          Bookmark.save(newBookmark, function() {
            $scope.bookmarks = $scope.getBookmarks();
            $scope.addedBookmark = $scope.bookmark;
            $scope.bookmark = {};
          });
        };

        $scope.cancel = function() {
          $scope.bookmark = {};
        };
      },
      controllerAs: 'appController'
    })
    .state('bookmark', {
      url: "/edit/bookmark/:id",
      templateUrl: "app/components/bookmark-cmp/bookmark.html",
      controller: function($scope, $stateParams, $resource, Bookmark) {
        $scope.id = $stateParams.id;

        Bookmark.get({ id: $scope.id }, function(result) {
          $scope.bookmark = result;
        });

        $scope.update = function(newBookmark) {
          Bookmark.update({id: $scope.id}, {
            title: newBookmark.title,
            url: newBookmark.url,
            tags: newBookmark.tags
          }, function() {
            $scope.bookmarks = $scope.getBookmarks();
          });
        };
      }
    });
});
