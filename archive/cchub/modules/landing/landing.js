angular.module('app.landing', ['ui.router']).config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('landing', {
            url: '/',
            templateUrl: 'modules/landing/views/home.html',
            controller: 'HomeCtrl'
        })
    }
]).controller('HomeCtrl', ['$scope', '$state',
    function($scope, $state) {
        console.log("Here")
    }
]);