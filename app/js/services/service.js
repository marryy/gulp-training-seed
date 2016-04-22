var bookmarkService = angular.module('bookmarkService', ['ngResource']);

bookmarkService.factory('Bookmark', ['$resource', function($resource){
  var url = 'https://api.mlab.com/api/1/databases/bookmarksdb/collections/bookmarks/:id?apiKey=JeGtL7Yo1AgC-OBOTpg2OQKteNdo6-Fr';
  return $resource(url, {id: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });
}]);
