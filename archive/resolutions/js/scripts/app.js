angular.module('ndaniresolutionsApp', [
  'ngResource',
  'ngRoute',
  'ngAnimate'
])

  .run(
    ['$rootScope', '$route', '$routeParams', '$location',
    function ($rootScope, $route, $routeParams, $location) {

      $rootScope.$route = $route;
      $rootScope.$routeParams = $routeParams;
      $rootScope.$location = $location;

    }])

  .config(
    [          '$routeProvider',
      function ($routeProvider) {

        // Home State

        $routeProvider
          .when('/', {
            templateUrl: 'views/main.html'
          })

          .when('/celebrity', {
            templateUrl: 'views/celebrity.html'
          })

          // Single Creative
          .when('/wall-of-resolutions', {
            templateUrl: 'views/pool.html',
            controller: 'MainCtrl'
          });
      }])

  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://distilleryimage*.s3.amazonaws.com/**'
    ]);
  }])

  .factory('instagram', function($resource){

    return {
      fetchTag: function(callback){

        // The ngResource module gives us the $resource service. It makes working with
        // AJAX easy. Here I am using the client_id of a test app. Replace it with yours.

        var api = $resource('https://api.instagram.com/v1/tags/ndaniresolutions/media/recent?client_id=:clientId&callback=JSON_CALLBACK',{
          clientId: '642176ece1e7445e99244cec26f4de1f'
        },{
          // This creates an action which we've chosen to name "fetch". It issues
          // an JSONP request to the URL of the resource. JSONP requires that the
          // callback=JSON_CALLBACK part is added to the URL.

          fetch:{method:'JSONP'}
        });

        api.fetch(function(response){

          // Call the supplied callback function
          callback(response.data);

        });
      }
    };
  });